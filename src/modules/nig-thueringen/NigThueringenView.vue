<script setup>
import { computed } from 'vue'
import ChoiceQuestion from '../../shared/components/ChoiceQuestion.vue'
import ModuleLayout from '../../shared/components/ModuleLayout.vue'
import ResultBox from '../../shared/components/ResultBox.vue'
import { CRITERIA_VERSION, core, groups } from './criteria.js'
import { useNigThueringenStore } from './store.js'
import ThueringenScene from './ThueringenScene.vue'

const store = useNigThueringenStore()
const result = computed(() => store.result)

const outcome = computed(() => {
  const { status, openMust } = result.value
  const [a, b] = result.value.counts
  if (status === 'ready') {
    return {
      tone: 'good',
      title: 'Die Kernkriterien sind erfüllt.',
      text: `Du hast ${a.count} von ${a.total} Naturgartenelementen und ${b.count} von ${b.total} Punkten bei der Bewirtschaftung. Eine Mindestzahl nennt der Verein nicht. Klär am besten vor der Anmeldung, ob das reicht.`,
    }
  }
  if (status === 'missing') {
    return {
      tone: 'bad',
      title: 'Ein Kernkriterium fehlt.',
      text: 'Alle drei Kernkriterien müssen erfüllt sein. Ohne sie gibt es keine Plakette.',
    }
  }
  return {
    tone: 'open',
    title: 'Noch nicht alles beantwortet.',
    text: `Noch ${openMust.length === 1 ? 'ein Kernkriterium' : `${openMust.length} Kernkriterien`} offen.`,
  }
})
</script>

<template>
  <ModuleLayout
    title="Ist dein Garten bereit für die Anmeldung?"
    lead="Prüfe ihn vorab nach den Kriterien für die Plakette „Natur im Garten“ in Thüringen."
  >
    <template #scene>
      <ThueringenScene class="lg:max-h-full" :state="store.answers" />
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Kernkriterien</h2>
    <p class="mt-2 max-w-[60ch]">Alle drei müssen erfüllt sein.</p>
    <div class="mt-7">
      <ChoiceQuestion v-for="c in core" :key="c.id" v-model="store.answers.must[c.id]" :criterion="c" />
    </div>

    <h2 class="mt-10 font-serif text-4xl font-bold leading-tight md:text-5xl">Deine Elemente</h2>
    <p class="mt-2 max-w-[60ch]">
      Laut Verein sollen die Elemente teilweise erfüllt sein. Eine Mindestzahl gibt es nicht, kreuze also einfach an, was du hast.
    </p>
    <fieldset v-for="group in groups" :key="group.id" class="mt-6">
      <legend class="font-serif text-2xl font-bold leading-tight">
        {{ group.title }}
        <span class="ml-1 font-sans text-base font-normal text-fir-soft">{{ result.counts.find((c) => c.id === group.id).count }} von {{ group.criteria.length }}</span>
      </legend>
      <div class="mt-3 grid gap-2 sm:grid-cols-2">
        <label
          v-for="c in group.criteria"
          :key="c.id"
          class="flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pollen"
          :class="store.answers.present.includes(c.id) ? 'border-fir bg-fir text-paper' : 'border-lichen-deep bg-paper hover:border-leaf'"
        >
          <input v-model="store.answers.present" type="checkbox" :value="c.id" class="size-5 shrink-0 accent-pollen" />
          {{ c.title }}
        </label>
      </div>
    </fieldset>

    <ResultBox :tone="outcome.tone" :title="outcome.title">{{ outcome.text }}</ResultBox>

    <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="next">
      <h2 id="next" class="font-serif text-2xl font-bold">Zur echten Plakette</h2>
      <p class="mt-2">
        Die Plakette vergibt „Natur im Garten“ Thüringen e.V. Fragen vor der Anmeldung beantwortet der Verein gern telefonisch unter
        <a class="font-bold underline" href="tel:+491752644677">0175 2644677</a>, schriftlich unter
        <a class="font-bold underline" href="mailto:NiG-Plakette@ist-einmalig.de">NiG-Plakette@ist-einmalig.de</a>.
      </p>
      <p class="mt-2 text-base">
        Mehr auf der
        <a class="font-bold underline" href="https://www.natur-im-garten-thr.de/seite/720165/der-weg-zur-plakette.html" target="_blank" rel="noopener">Seite des Vereins</a>.
        Ob Kosten anfallen, erfährst du bei der Anmeldung.
      </p>
      <p class="mt-2 text-base">Grundlage ist der {{ CRITERIA_VERSION }}. Dieser Check ist kein offizielles Angebot und ersetzt keine Begehung.</p>
    </section>
  </ModuleLayout>
</template>
