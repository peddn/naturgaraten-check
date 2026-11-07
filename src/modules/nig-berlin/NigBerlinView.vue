<script setup>
import { computed } from 'vue'
import ChoiceQuestion from '../../shared/components/ChoiceQuestion.vue'
import ModuleLayout from '../../shared/components/ModuleLayout.vue'
import ResultBox from '../../shared/components/ResultBox.vue'
import BerlinScene from './BerlinScene.vue'
import { CRITERIA_VERSION, basics, bonus, core, groups } from './criteria.js'
import { useNigBerlinStore } from './store.js'

const store = useNigBerlinStore()
const result = computed(() => store.result)

const outcome = computed(() => {
  const { status, failed, open, missing, count, required } = result.value
  if (status === 'ready') {
    return {
      tone: 'good',
      title: 'Dein Garten erfüllt die Kriterien.',
      text: `Mit ${count} weiteren Kriterien liegst du über der Mindestzahl von ${required}. Die Entscheidung fällt bei der Begehung vor Ort.`,
    }
  }
  if (failed.length > 0) {
    return {
      tone: 'bad',
      title: 'Ein Pflichtkriterium fehlt.',
      text: `${failed.map((c) => c.title).join(', ')}: Kern- und Grundkriterien müssen alle erfüllt sein.`,
    }
  }
  if (open.length > 0) {
    return { tone: 'open', title: 'Noch nicht alles beantwortet.', text: `Noch ${open.length === 1 ? 'eine Pflichtfrage' : `${open.length} Pflichtfragen`} offen.` }
  }
  return {
    tone: 'bad',
    title: missing === 1 ? 'Es fehlt noch ein Kriterium.' : `Es fehlen noch ${missing} Kriterien.`,
    text: `Du brauchst mindestens ${required} weitere Kriterien, angekreuzt ${count === 1 ? 'ist eines' : `sind ${count}`}.`,
  }
})
</script>

<template>
  <ModuleLayout
    title="Erfüllt dein Garten die Kriterien?"
    lead="Prüfe ihn selbst nach den Kriterien für die Plakette „Natur im Garten“ in Berlin."
  >
    <template #scene>
      <BerlinScene class="lg:max-h-full" :state="store.answers" :result="result" />
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Kernkriterien</h2>
    <p class="mt-2 max-w-[60ch]">Alle müssen erfüllt sein.</p>
    <div class="mt-7">
      <ChoiceQuestion v-for="c in core" :key="c.id" v-model="store.answers.core[c.id]" :criterion="c" />
    </div>

    <h2 class="mt-10 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Grundkriterien</h2>
    <p class="mt-2 max-w-[60ch]">Auch diese beiden müssen erfüllt sein.</p>
    <div class="mt-7">
      <ChoiceQuestion v-for="c in basics" :key="c.id" v-model="store.answers.basics[c.id]" :criterion="c" />
    </div>

    <h2 class="mt-10 font-serif text-4xl font-bold leading-tight md:text-5xl">Weitere Kriterien</h2>
    <p class="mt-2 max-w-[60ch]">Kreuze an, was es bei dir gibt. Du brauchst mindestens {{ result.required }}, egal aus welchem Bereich.</p>
    <div class="sticky top-0 z-10 -mx-4 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 bg-lichen/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
      <div class="flex gap-1" aria-hidden="true">
        <span
          v-for="n in Math.max(result.required, result.count)"
          :key="n"
          class="size-4 rounded-full transition-colors"
          :class="[n <= result.count ? 'bg-pollen' : 'bg-fir/15', n === result.required ? 'ring-2 ring-fir ring-offset-2 ring-offset-lichen' : '']"
        />
      </div>
      <span class="font-bold" aria-live="polite">{{ result.count }} von mindestens {{ result.required }} Kriterien</span>
    </div>

    <fieldset v-for="group in groups" :key="group.id" class="mt-6">
      <legend class="font-serif text-2xl font-bold leading-tight">
        {{ group.title }}
        <span class="ml-1 font-sans text-base font-normal text-fir-soft">{{ result.groups.find((g) => g.id === group.id).count }} angekreuzt</span>
      </legend>
      <div class="mt-3 grid gap-2 md:grid-cols-2">
        <label
          v-for="c in group.criteria"
          :key="c.id"
          class="flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pollen"
          :class="store.answers.checked.includes(c.id) ? 'border-fir bg-fir text-paper' : 'border-lichen-deep bg-paper hover:border-leaf'"
        >
          <input v-model="store.answers.checked" type="checkbox" :value="c.id" class="mt-1 size-5 shrink-0 accent-pollen" />
          <span>
            <span class="block font-bold leading-snug">{{ c.title }}</span>
            <span v-if="c.text" class="block text-base leading-snug">{{ c.text }}</span>
          </span>
        </label>
      </div>
    </fieldset>

    <ResultBox :tone="outcome.tone" :title="outcome.title">{{ outcome.text }}</ResultBox>

    <section class="mt-8" aria-labelledby="bonus">
      <h2 id="bonus" class="font-serif text-2xl font-bold">Bonuspunkte</h2>
      <p class="mt-1 max-w-[60ch]">Das Kriterienpapier nennt sie zusätzlich, sie zählen nicht zu den 7 Kriterien:</p>
      <ul class="mt-2 list-disc pl-5">
        <li v-for="item in bonus" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="next">
      <h2 id="next" class="font-serif text-2xl font-bold">Zur echten Plakette</h2>
      <p class="mt-2">
        Die Plakette vergibt
        <a class="font-bold underline" href="https://www.naturimgarten.berlin/" target="_blank" rel="noopener">Natur im Garten Berlin</a>
        nach einer Begehung vor Ort. Dort findest du Termine und die Anmeldung.
      </p>
      <p class="mt-2 text-base">Ob und welche Kosten anfallen, erfährst du bei der Anmeldung.</p>
      <p class="mt-2 text-base">Grundlage ist das {{ CRITERIA_VERSION }}. Dieser Check ist kein offizielles Angebot und ersetzt keine Begehung.</p>
    </section>
  </ModuleLayout>
</template>
