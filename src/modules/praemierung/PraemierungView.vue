<script setup>
import { computed } from 'vue'
import ChoiceQuestion from '../../shared/components/ChoiceQuestion.vue'
import ModuleLayout from '../../shared/components/ModuleLayout.vue'
import ResultBox from '../../shared/components/ResultBox.vue'
import { CRITERIA_VERSION, biotopes, countCriteria, strictCriteria, testerFocus } from './criteria.js'
import PraemierungScene from './PraemierungScene.vue'
import { usePraemierungStore } from './store.js'

const store = usePraemierungStore()

const stateLabels = {
  ok: { text: 'Erfüllt', class: 'text-leaf' },
  exception: { text: 'Ausnahme', class: 'text-soil' },
  fail: { text: 'Fehlt', class: 'text-rosehip' },
  open: { text: 'Offen', class: 'text-fir-soft' },
}

const outcome = computed(() => {
  const { status, failed, open, exceptions } = store.result
  if (status === 'bronze') {
    return {
      tone: 'good',
      title: 'Die Bronze-Kriterien sind erfüllt.',
      text: 'Nach deiner Einschätzung ist mindestens Bronze möglich. Ob es Silber oder Gold wird, zeigt erst die Bewertung vor Ort.',
    }
  }
  if (status === 'oasis') {
    return {
      tone: 'good',
      title: 'Die Grüne Oase ist möglich.',
      text: `Für Bronze reicht es wegen „${exceptions[0].title}“ nicht. Die Grüne Oase lässt das als Ausnahme zu, verlangt aber zusätzlich eine besonders gute Bewertung bei den Kann-Kriterien. Die sind nicht veröffentlicht.`,
    }
  }
  if (status === 'unclear') {
    return {
      tone: 'open',
      title: 'Hier hilft nur Nachfragen.',
      text: `Bei dir greifen ${exceptions.length} Ausnahmen. Das Infoblatt lässt offen, ob mehrere zugleich für die Grüne Oase reichen.`,
    }
  }
  if (status === 'missing') {
    return {
      tone: 'bad',
      title: 'Für eine Auszeichnung fehlt noch etwas.',
      text: `Das fehlt: ${failed.map((item) => item.title).join(', ')}.`,
    }
  }
  return {
    tone: 'open',
    title: 'Noch nicht alles beantwortet.',
    text: `Noch ${open.length === 1 ? 'ein Punkt' : `${open.length} Punkte`} offen.`,
  }
})
</script>

<template>
  <ModuleLayout
    title="Reicht es für Bronze?"
    lead="Prüfe deinen Garten nach dem Quick-Check der Naturgartenprämierung, früher „Tausende Gärten – Tausende Arten“."
  >
    <template #scene>
      <PraemierungScene class="lg:max-h-full" :state="store.answers" :result="store.result" />
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Die Mindestkriterien</h2>
    <p class="mt-2 max-w-[60ch]">Für Bronze müssen alle voll erfüllt sein.</p>
    <div class="mt-7">
      <ChoiceQuestion
        v-for="criterion in strictCriteria"
        :key="criterion.id"
        v-model="store.answers.strict[criterion.id]"
        :criterion="criterion"
      />
      <ChoiceQuestion
        v-for="criterion in countCriteria"
        :key="criterion.id"
        v-model="store.answers.counts[criterion.id]"
        :criterion="criterion"
        :options="criterion.options"
      />
      <fieldset class="py-6">
        <legend class="contents">
          <span class="block font-serif text-2xl font-bold leading-tight">Klein-Biotopelemente</span>
          <span class="mt-1 block">Welche gibt es bei dir? Du brauchst mindestens zwei.</span>
        </legend>
        <p class="mt-2 max-w-[68ch] text-base text-fir-soft">
          Das Infoblatt nennt die Liste nur beispielhaft, andere Elemente können also ebenfalls zählen.
        </p>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          <label
            v-for="biotope in biotopes"
            :key="biotope.id"
            class="flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-lichen-deep bg-paper p-3 hover:border-leaf"
          >
            <input v-model="store.answers.biotopes" type="checkbox" :value="biotope.id" class="size-5 accent-leaf" />
            {{ biotope.label }}
          </label>
        </div>
      </fieldset>
    </div>

    <ResultBox :tone="outcome.tone" :title="outcome.title">{{ outcome.text }}</ResultBox>

    <section class="mt-8" aria-labelledby="items-title">
      <h2 id="items-title" class="font-serif text-2xl font-bold">Dein Stand</h2>
      <ul class="mt-2">
        <li v-for="item in store.result.items" :key="item.id" class="flex items-baseline gap-2 py-0.5">
          <span class="w-20 shrink-0 font-bold" :class="stateLabels[item.state].class">{{ stateLabels[item.state].text }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </section>

    <section class="mt-8" aria-labelledby="stages">
      <h2 id="stages" class="font-serif text-2xl font-bold">Silber und Gold</h2>
      <p class="mt-1 max-w-[60ch]">
        Die Stufen hängen von einer Bewertungsmatrix ab, die nicht veröffentlicht ist. Dieser Check kann sie deshalb nicht berechnen. Je besser dein Garten bei diesen Punkten abschneidet, desto mehr Punkte gibt es:
      </p>
      <ul class="mt-2 list-disc pl-5">
        <li v-for="item in testerFocus" :key="item">{{ item }}</li>
      </ul>
    </section>

    <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="prae-next">
      <h2 id="prae-next" class="font-serif text-2xl font-bold">Zur echten Prämierung</h2>
      <p class="mt-2">
        Bewirb dich online bei
        <a class="font-bold underline" href="https://naturgarten.org/naturgartenpraemierung/" target="_blank" rel="noopener">NaturGarten e.V.</a>
        Der Verein führt die Prämierung seit 2026 durch. Danach besichtigt ein geprüfter Tester deinen Garten und stuft ihn ein.
      </p>
      <p class="mt-2 text-base">
        Die Teilnahme kostet einmalig etwa 50 bis 60 € inklusive Schild. Die Seiten des Vereins nennen 48,15 € und 58 €, frag also vorher nach.
      </p>
      <p class="mt-2 text-base">
        Grundlage dieses Checks ist der {{ CRITERIA_VERSION }}. Der aktuelle Quick-Check des Vereins könnte abweichen. Dieser Check ist kein offizielles Angebot und ersetzt keine Bewertung.
      </p>
    </section>
  </ModuleLayout>
</template>
