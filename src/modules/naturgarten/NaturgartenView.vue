<script setup>
import { computed, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChoiceQuestion from '../../shared/components/ChoiceQuestion.vue'
import ModuleLayout from '../../shared/components/ModuleLayout.vue'
import CriterionRating from './components/CriterionRating.vue'
import GardenScene from './components/GardenScene.vue'
import ResultView from './components/ResultView.vue'
import SmileyMeter from './components/SmileyMeter.vue'
import { BLOWER_CONDITION_CRITERION, categories, coreCriteria, overallCriterion } from './criteria.js'
import { isBlocked } from './scoring.js'
import { useNaturgartenStore } from './store.js'

const store = useNaturgartenStore()
const route = useRoute()
const router = useRouter()

const steps = [
  { slug: 'grundregeln', label: 'Grundregeln', title: 'Die Grundregeln', intro: 'Diese drei Regeln gelten ohne Ausnahme. Fehlt eine, gibt es keine Plakette.' },
  { slug: 'vielfalt', label: 'Vielfalt', title: categories[0].title, intro: `${categories[0].intro} Du brauchst mindestens 7 Smileys.`, category: categories[0] },
  { slug: 'nutzgarten', label: 'Nutzgarten', title: categories[1].title, intro: `${categories[1].intro} Auch hier brauchst du mindestens 7 Smileys.`, category: categories[1] },
  { slug: 'gesamteindruck', label: 'Gesamteindruck', title: 'Der Gesamteindruck', intro: 'Jetzt, nach dem Rundgang, der Blick aufs Ganze. Das ist die vierte Grundregel.' },
  { slug: 'ergebnis', label: 'Ergebnis' },
]

const step = computed(() => Math.max(0, steps.findIndex((item) => item.slug === route.params.step)))
const current = computed(() => steps[step.value])
const activeScore = computed(() =>
  current.value.category ? store.result.categories.find((c) => c.id === current.value.category.id) : null,
)

const pathFor = (index) => `/naturgarten/${steps[index].slug}`
const goTo = (index) => router.push(pathFor(index))

watch(step, async () => {
  await nextTick()
  document.querySelector('[data-step-heading]')?.focus({ preventScroll: true })
  document.querySelector('[aria-current="step"]')?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  document.getElementById('check')?.scrollIntoView({ block: 'start' })
})
</script>

<template>
  <ModuleLayout
    title="Wie nah ist dein Garten an der Plakette?"
    lead="Prüfe ihn selbst nach den Kriterien von „Bayern blüht – Naturgarten“. Mit jeder Antwort wächst dein Garten mit."
  >
    <template #scene>
      <GardenScene class="lg:max-h-full" :state="store.answers" :result="store.result" />
    </template>

    <nav aria-label="Schritte" class="sticky top-0 z-10 -mx-4 bg-lichen/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
      <ol class="flex gap-1 overflow-x-auto">
        <li v-for="(item, index) in steps" :key="item.slug" class="shrink-0">
          <RouterLink
            :to="pathFor(index)"
            class="flex items-center gap-1.5 rounded-full px-3 py-1 font-bold whitespace-nowrap transition-colors"
            :class="index === step ? 'bg-fir text-paper' : 'hover:bg-lichen-deep'"
            :aria-current="index === step ? 'step' : undefined"
          >
            <span class="font-serif">{{ index + 1 }}</span>
            {{ item.label }}
          </RouterLink>
        </li>
      </ol>
    </nav>

    <template v-if="current.slug === 'ergebnis'">
      <GardenScene class="mt-3 rounded-3xl bg-fir lg:hidden" :state="store.answers" :result="store.result" />
      <ResultView class="mt-5" :result="store.result" :state="store.answers" @go="goTo" />
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
          <ChoiceQuestion
            v-for="criterion in coreCriteria"
            :key="criterion.id"
            v-model="store.answers.core[criterion.id]"
            :criterion="criterion"
          />
        </template>

        <template v-else-if="current.category">
          <CriterionRating
            v-for="criterion in current.category.criteria"
            :key="criterion.id"
            v-model="store.answers.ratings[criterion.id]"
            :criterion="criterion"
            :blocked="isBlocked(store.answers, criterion.id)"
          >
            <label
              v-if="criterion.id === BLOWER_CONDITION_CRITERION"
              class="mt-3 flex cursor-pointer items-start gap-2 rounded-2xl bg-lichen-deep p-3"
            >
              <input v-model="store.answers.usesBlowerOrRobot" type="checkbox" class="mt-1 size-5 accent-rosehip" />
              <span>
                <span class="block font-bold">Ich nutze Laubsauger oder Mähroboter</span>
                <span class="block text-base">Dann gibt es hier keinen Smiley, auch nicht für Teilweise.</span>
              </span>
            </label>
          </CriterionRating>
        </template>

        <template v-else>
          <ChoiceQuestion v-model="store.answers.core[overallCriterion.id]" :criterion="overallCriterion" />
          <p v-if="store.answers.usesBlowerOrRobot" class="mt-1 rounded-2xl bg-lichen-deep p-3">
            Du nutzt Laubsauger oder Mähroboter. Beides soll laut Leitfaden im Naturgarten nicht vorkommen.
          </p>
          <label class="mt-6 block">
            <span class="font-bold">Wie heißt dein Garten? (freiwillig)</span>
            <span class="block text-base text-fir-soft">Der Name erscheint im Dateinamen, wenn du exportierst.</span>
            <input
              v-model="store.answers.gardenName"
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
  </ModuleLayout>
</template>
