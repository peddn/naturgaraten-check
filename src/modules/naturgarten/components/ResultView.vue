<script setup>
import { computed } from 'vue'
import { CRITERIA_VERSION } from '../criteria.js'
import PointMeter from '../../../shared/components/PointMeter.vue'

const props = defineProps({
  result: { type: Object, required: true },
  state: { type: Object, required: true },
})
defineEmits(['go'])

const headline = computed(
  () =>
    ({
      ready: 'Dein Garten erfüllt die Kriterien.',
      missing: 'Bis zur Plakette fehlt noch etwas.',
      open: 'Noch nicht alles beantwortet.',
    })[props.result.status],
)

const summary = computed(() => {
  const { status, coreFailed, coreOpen } = props.result
  if (status === 'ready') {
    return 'Nach deiner Einschätzung kannst du dich zur Zertifizierung anmelden. Die Entscheidung treffen zwei Zertifizierer bei der Begehung vor Ort.'
  }
  if (status === 'missing') {
    return coreFailed.length > 0
      ? 'Alle vier Grundregeln müssen erfüllt sein. Hier hilft kein Ausgleich durch Smileys.'
      : 'Pro Bereich brauchst du mindestens 7 Smileys. Mehr in einem Bereich gleicht den anderen nicht aus.'
  }
  return coreOpen.length > 0
    ? `Es fehlen noch ${coreOpen.length === 1 ? 'eine Grundregel' : `${coreOpen.length} Grundregeln`} und vielleicht ein paar Bewertungen.`
    : 'Bewerte die offenen Kriterien, damit das Ergebnis feststeht.'
})

const openSuggestions = computed(() => props.result.suggestions.filter((s) => s.items.length > 0))

const STEP_FOR_CATEGORY = { vielfalt: 1, nutzgarten: 2 }
const stepForCore = (id) => (id === 'gesamteindruck' ? 3 : 0)
</script>

<template>
  <div>
    <h2 tabindex="-1" data-step-heading class="font-serif text-4xl font-bold leading-tight outline-none md:text-5xl">
      {{ headline }}
    </h2>
    <p class="mt-3 max-w-[60ch]">{{ summary }}</p>
    <p v-if="state.usesBlowerOrRobot" class="mt-3 max-w-[60ch] rounded-2xl bg-lichen-deep p-3">
      Du nutzt Laubsauger oder Mähroboter. Darauf soll im Naturgarten verzichtet werden, auch das fließt in den Gesamteindruck ein.
    </p>

    <section class="mt-8" aria-labelledby="core-result">
      <h3 id="core-result" class="font-serif text-2xl font-bold">Grundregeln</h3>
      <ul class="mt-2">
        <li v-for="item in result.core" :key="item.id" class="flex items-baseline gap-2 py-0.5">
          <span
            class="w-14 shrink-0 font-bold"
            :class="{ 'text-leaf': item.value === true, 'text-rosehip': item.value === false, 'text-fir-soft': item.value === null }"
          >
            {{ item.value === true ? 'Erfüllt' : item.value === false ? 'Fehlt' : 'Offen' }}
          </span>
          <button
            v-if="item.value !== true"
            type="button"
            class="text-left underline decoration-leaf underline-offset-2"
            @click="$emit('go', stepForCore(item.id))"
          >
            {{ item.title }}
          </button>
          <span v-else>{{ item.title }}</span>
        </li>
      </ul>
    </section>

    <section class="mt-8" aria-labelledby="smiley-result">
      <h3 id="smiley-result" class="font-serif text-2xl font-bold">Smileys pro Bereich</h3>
      <dl class="mt-2 space-y-3">
        <div v-for="category in result.categories" :key="category.id">
          <dt>{{ category.title }}</dt>
          <dd class="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-leaf">
            <PointMeter :score="category.score" :required="category.required" />
            <span class="font-bold text-fir">
              {{ category.score }} von mindestens {{ category.required }}
              <span class="font-normal">({{ category.answered }} von {{ category.total }} bewertet)</span>
            </span>
          </dd>
        </div>
      </dl>
    </section>

    <section v-if="openSuggestions.length" class="mt-8" aria-labelledby="tips">
      <h3 id="tips" class="font-serif text-2xl font-bold">So kommst du am schnellsten hin</h3>
      <p class="mt-1 text-base text-fir-soft">
        Diese Kriterien bringen die meisten Smileys. Stufe sie hoch, wenn du sie umgesetzt hast.
      </p>
      <div v-for="group in openSuggestions" :key="group.id" class="mt-4">
        <h4 class="font-bold">{{ group.title }}</h4>
        <ul class="mt-1 space-y-2">
          <li v-for="item in group.items" :key="item.id" class="border-l-4 border-sprout pl-3">
            <button
              type="button"
              class="text-left underline decoration-leaf underline-offset-2"
              @click="$emit('go', STEP_FOR_CATEGORY[group.id])"
            >
              {{ item.title }}
            </button>
            <span class="ml-1 text-base text-fir-soft">bis zu +{{ item.gain }}</span>
            <p class="text-base">{{ item.tip }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-8" aria-labelledby="notes-label">
      <h3 id="notes-label" class="font-serif text-2xl font-bold">Deine Notizen</h3>
      <textarea
        v-model="state.notes"
        rows="4"
        maxlength="5000"
        aria-labelledby="notes-label"
        placeholder="Was willst du im nächsten Frühjahr angehen?"
        class="mt-2 w-full rounded-2xl border-2 border-lichen-deep bg-paper p-3 placeholder:text-fir-soft/70"
      />
    </section>

    <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="next">
      <h3 id="next" class="font-serif text-2xl font-bold">Zur echten Plakette</h3>
      <p class="mt-2">
        Melde dich unter
        <a class="font-bold underline" href="mailto:naturgarten@gartenbauvereine.org">naturgarten@gartenbauvereine.org</a>
        und nenne deinen Ort und ob du Mitglied im Obst- und Gartenbauverein bist. Zwei Zertifizierer gehen dann mit dir durch den Garten.
      </p>
      <p class="mt-2 text-base">
        Die Zertifizierung kostet einen Beitrag, der für Vereinsmitglieder niedriger ist. Die aktuelle Höhe und ob dein Landkreis teilnimmt, erfährst du beim Kreisverband oder der Kreisfachberatung.
      </p>
      <p class="mt-2 text-base">
        Dieser Check ist kein offizielles Angebot und ersetzt keine Zertifizierung. Grundlage ist der Leitfaden, Stand {{ CRITERIA_VERSION }}.
      </p>
    </section>
  </div>
</template>
