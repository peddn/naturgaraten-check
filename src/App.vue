<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import CoreQuestion from './components/CoreQuestion.vue'
import CriterionRating from './components/CriterionRating.vue'
import DataTools from './components/DataTools.vue'
import GardenScene from './components/GardenScene.vue'
import ResultView from './components/ResultView.vue'
import SmileyMeter from './components/SmileyMeter.vue'
import { BLOWER_CONDITION_CRITERION, categories, coreCriteria, overallCriterion } from './data/criteria.js'
import { createEmptyState, evaluate, isBlocked } from './lib/scoring.js'
import { loadState, saveState } from './lib/storage.js'

const state = reactive(loadState())
const step = ref(0)
const saved = ref(saveState(state))

watch(state, (value) => {
  saved.value = saveState(value)
}, { deep: true })

const result = computed(() => evaluate(state))

const steps = [
  { label: 'Grundregeln', title: 'Die Grundregeln', intro: 'Diese drei Regeln gelten ohne Ausnahme. Fehlt eine, gibt es keine Plakette.' },
  { label: 'Vielfalt', title: categories[0].title, intro: `${categories[0].intro} Du brauchst mindestens 7 Smileys.`, category: categories[0] },
  { label: 'Nutzgarten', title: categories[1].title, intro: `${categories[1].intro} Auch hier brauchst du mindestens 7 Smileys.`, category: categories[1] },
  { label: 'Gesamteindruck', title: 'Der Gesamteindruck', intro: 'Jetzt, nach dem Rundgang, der Blick aufs Ganze. Das ist die vierte Grundregel.' },
  { label: 'Ergebnis' },
]

const current = computed(() => steps[step.value])
const activeScore = computed(() =>
  current.value.category ? result.value.categories.find((c) => c.id === current.value.category.id) : null,
)

async function goTo(index) {
  step.value = index
  await nextTick()
  document.querySelector('[data-step-heading]')?.focus({ preventScroll: true })
  document.querySelector('[aria-current="step"]')?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  document.getElementById('check')?.scrollIntoView({ block: 'start' })
}

function replaceState(next) {
  Object.assign(state, next)
}

function resetState() {
  Object.assign(state, createEmptyState())
  step.value = 0
}
</script>

<template>
  <div class="lg:grid lg:min-h-dvh lg:grid-cols-[minmax(24rem,5fr)_7fr]">
    <aside class="bg-fir text-lichen lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
      <header class="px-4 pt-6 sm:px-8 lg:pt-10">
        <p class="font-bold text-sprout">Naturgarten-Check</p>
        <h1 class="mt-1 max-w-[16ch] font-serif text-4xl font-bold leading-[1.08] text-paper xl:text-5xl">
          Wie nah ist dein Garten an der Plakette?
        </h1>
        <p class="mt-3 max-w-[42ch]">
          Prüfe ihn selbst nach den Kriterien von „Bayern blüht – Naturgarten“. Mit jeder Antwort wächst dein Garten mit.
        </p>
      </header>
      <div class="mt-4 lg:flex lg:min-h-0 lg:flex-1 lg:items-end">
        <GardenScene class="lg:max-h-full" :state="state" :result="result" />
      </div>
    </aside>

    <main id="check" class="scroll-mt-0 px-4 pb-12 sm:px-8 lg:px-14">
      <div class="mx-auto max-w-3xl">
        <nav aria-label="Schritte" class="sticky top-0 z-10 -mx-4 bg-lichen/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
          <ol class="flex gap-1 overflow-x-auto">
            <li v-for="(item, index) in steps" :key="item.label" class="shrink-0">
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-full px-3 py-1 font-bold whitespace-nowrap transition-colors"
                :class="index === step ? 'bg-fir text-paper' : 'hover:bg-lichen-deep'"
                :aria-current="index === step ? 'step' : undefined"
                @click="goTo(index)"
              >
                <span class="font-serif">{{ index + 1 }}</span>
                {{ item.label }}
              </button>
            </li>
          </ol>
        </nav>

        <template v-if="step === 4">
          <GardenScene class="mt-3 rounded-3xl bg-fir lg:hidden" :state="state" :result="result" />
          <ResultView class="mt-5" :result="result" :state="state" @go="goTo" />
        </template>

        <template v-else>
          <h2 tabindex="-1" data-step-heading class="mt-5 font-serif text-4xl font-bold leading-tight outline-none md:text-5xl">
            {{ current.title }}
          </h2>
          <p class="mt-2 max-w-[60ch]">{{ current.intro }}</p>

          <div v-if="activeScore" class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-leaf">
            <SmileyMeter :score="activeScore.score" :required="activeScore.required" />
            <span class="font-bold text-fir" aria-live="polite">{{ activeScore.score }} von mindestens {{ activeScore.required }} Smileys</span>
          </div>

          <div class="mt-7">
            <template v-if="step === 0">
              <CoreQuestion
                v-for="criterion in coreCriteria"
                :key="criterion.id"
                v-model="state.core[criterion.id]"
                :criterion="criterion"
              />
            </template>

            <template v-else-if="current.category">
              <CriterionRating
                v-for="criterion in current.category.criteria"
                :key="criterion.id"
                v-model="state.ratings[criterion.id]"
                :criterion="criterion"
                :blocked="isBlocked(state, criterion.id)"
              >
                <label
                  v-if="criterion.id === BLOWER_CONDITION_CRITERION"
                  class="mt-3 flex cursor-pointer items-start gap-2 rounded-2xl bg-lichen-deep p-3"
                >
                  <input v-model="state.usesBlowerOrRobot" type="checkbox" class="mt-1 size-5 accent-rosehip" />
                  <span>
                    <span class="block font-bold">Ich nutze Laubsauger oder Mähroboter</span>
                    <span class="block text-base">Dann gibt es hier keinen Smiley, auch nicht für Teilweise.</span>
                  </span>
                </label>
              </CriterionRating>
            </template>

            <template v-else>
              <CoreQuestion v-model="state.core[overallCriterion.id]" :criterion="overallCriterion" />
              <p v-if="state.usesBlowerOrRobot" class="mt-1 rounded-2xl bg-lichen-deep p-3">
                Du nutzt Laubsauger oder Mähroboter. Beides soll laut Leitfaden im Naturgarten nicht vorkommen.
              </p>
              <label class="mt-6 block">
                <span class="font-bold">Wie heißt dein Garten? (freiwillig)</span>
                <span class="block text-base text-fir-soft">Der Name erscheint im Dateinamen, wenn du exportierst.</span>
                <input
                  v-model="state.gardenName"
                  maxlength="120"
                  class="mt-1 w-full max-w-md rounded-2xl border-2 border-lichen-deep bg-paper px-3 py-2"
                />
              </label>
            </template>
          </div>

          <div class="mt-8 flex gap-2">
            <button
              v-if="step > 0"
              type="button"
              class="rounded-full border-2 border-leaf/50 px-5 py-2 font-bold transition-colors hover:border-leaf hover:bg-paper"
              @click="goTo(step - 1)"
            >
              Zurück
            </button>
            <button
              type="button"
              class="rounded-full bg-leaf px-6 py-2 font-bold text-paper transition-colors hover:bg-fir"
              @click="goTo(step + 1)"
            >
              {{ step === 3 ? 'Ergebnis ansehen' : 'Weiter' }}
            </button>
          </div>
        </template>

        <DataTools :state="state" :saved="saved" @replace="replaceState" @reset="resetState" />
      </div>
    </main>
  </div>
</template>
