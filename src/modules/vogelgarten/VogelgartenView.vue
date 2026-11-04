<script setup>
import { computed } from 'vue'
import ChoiceQuestion from '../../shared/components/ChoiceQuestion.vue'
import ModuleLayout from '../../shared/components/ModuleLayout.vue'
import ResultBox from '../../shared/components/ResultBox.vue'
import { exclusionCriteria, juryFocus, mustCriteria } from './criteria.js'
import { useVogelgartenStore } from './store.js'
import VogelScene from './VogelScene.vue'

const store = useVogelgartenStore()

const exclusionOptions = [
  { value: true, label: 'Ja', tone: 'bad' },
  { value: false, label: 'Nein', tone: 'good' },
]

const outcome = computed(() => {
  const { status, excluded, met, openMust, openExclusions, required } = store.result
  if (status === 'ready') {
    return {
      tone: 'good',
      title: 'Du kannst dich anmelden.',
      text: 'Du erfüllst die Bedingungen der Anmeldung. Über die Plakette entscheidet die Jury im Garten, weil dort noch weitere Kriterien zählen.',
    }
  }
  if (status === 'excluded') {
    return {
      tone: 'bad',
      title: 'Ein Ausschlusskriterium trifft zu.',
      text: `${excluded.map((c) => c.title).join(', ')}: Das lässt sich nicht durch andere Maßnahmen ausgleichen. Beseitige es, bevor du dich anmeldest.`,
    }
  }
  if (status === 'missing') {
    return {
      tone: 'bad',
      title: 'Es fehlen noch Musskriterien.',
      text: `Du brauchst mindestens ${required} von 4, erfüllt ${met.length === 1 ? 'ist 1' : `sind ${met.length}`}.`,
    }
  }
  const open = openMust.length + openExclusions.length
  return {
    tone: 'open',
    title: 'Noch nicht alles beantwortet.',
    text: `Noch ${open === 1 ? 'eine Frage' : `${open} Fragen`} offen.`,
  }
})
</script>

<template>
  <ModuleLayout
    title="Dürfen die Vögel bei dir einziehen?"
    lead="Prüfe, ob du dich für die Plakette „Vogelfreundlicher Garten“ anmelden kannst. Sie ist kostenlos und gilt für private Gärten in Bayern."
  >
    <template #scene>
      <VogelScene class="lg:max-h-full" :state="store.answers" :result="store.result" />
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Musskriterien</h2>
    <p class="mt-2 max-w-[60ch]">Mindestens 2 von 4 müssen erfüllt sein.</p>
    <div class="mt-7">
      <ChoiceQuestion
        v-for="criterion in mustCriteria"
        :key="criterion.id"
        v-model="store.answers.must[criterion.id]"
        :criterion="criterion"
      />
    </div>

    <h2 class="mt-10 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Ausschlusskriterien</h2>
    <p class="mt-2 max-w-[60ch]">Ein einziges Ja schließt deinen Garten aus.</p>
    <div class="mt-7">
      <template v-for="criterion in exclusionCriteria" :key="criterion.id">
        <ChoiceQuestion
          v-model="store.answers.exclusions[criterion.id]"
          :criterion="criterion"
          :options="exclusionOptions"
        />
        <p v-if="criterion.stricter" class="-mt-3 mb-6 max-w-[68ch] rounded-2xl bg-lichen-deep p-3 text-base">
          {{ criterion.stricter }}
        </p>
      </template>
    </div>

    <ResultBox :tone="outcome.tone" :title="outcome.title">{{ outcome.text }}</ResultBox>

    <section class="mt-8" aria-labelledby="jury">
      <h2 id="jury" class="font-serif text-2xl font-bold">Was die Jury im Garten ansieht</h2>
      <p class="mt-1 max-w-[60ch]">
        Der vollständige Kriterienkatalog ist nicht öffentlich, deshalb prüft dieser Check nur die Anmeldung. Bekannt ist, dass die Jury unter anderem hierauf achtet:
      </p>
      <ul class="mt-2 list-disc pl-5">
        <li v-for="item in juryFocus" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="vogel-next">
      <h2 id="vogel-next" class="font-serif text-2xl font-bold">Zur echten Plakette</h2>
      <p class="mt-2">
        Melde dich online beim
        <a class="font-bold underline" href="https://www.lbv.de/mitmachen/fuer-einsteiger/projekt-vogelfreundlicher-garten/garten-bewerten-lassen/" target="_blank" rel="noopener">LBV</a>
        an. Ein Team der ehrenamtlichen Jury besucht dann deinen Garten.
      </p>
      <p class="mt-2 text-base">
        Gärten werden nach Eingang besucht, es kann also dauern. Im November 2026 merkte der LBV neue Anmeldungen für die Saison 2027 vor.
      </p>
      <p class="mt-2 text-base">Dieser Check ist kein offizielles Angebot und ersetzt keine Bewertung.</p>
    </section>
  </ModuleLayout>
</template>
