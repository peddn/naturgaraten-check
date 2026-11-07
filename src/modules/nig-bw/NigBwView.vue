<script setup>
import TieredCheck from '../../shared/components/TieredCheck.vue'
import { CRITERIA_VERSION, bonus, config } from './criteria.js'
import { effectiveRating, options } from './scoring.js'
import { useNigBwStore } from './store.js'

const store = useNigBwStore()
const rating = (id) => effectiveRating(store.answers, id)
</script>

<template>
  <TieredCheck
    base="/nig-bw"
    title="Erfüllt dein Garten die Kriterien?"
    lead="Prüfe ihn selbst nach den Kriterien für die Plakette „Natur im Garten“ in Baden-Württemberg."
    :config="config"
    :store="store"
    :options="options"
    :rating="rating"
    shape="star"
    :level-labels="['Noch nicht', 'Ansatzweise', 'Zur Gänze']"
  >
    <template #intro>
      <label class="mb-6 flex cursor-pointer items-start gap-2 rounded-2xl bg-lichen-deep p-3">
        <input v-model="store.answers.kleingarten" type="checkbox" class="mt-1 size-5 accent-leaf" />
        <span>
          <span class="block font-bold">Mein Garten ist eine Kleingartenparzelle</span>
          <span class="block text-base">Dann zählen Bäume nicht, und bei einigen Kriterien gelten Hinweise zur Gartenordnung.</span>
        </span>
      </label>
    </template>

    <template #criterion="{ criterion }">
      <p v-if="store.answers.kleingarten && criterion.allotmentNote" class="mt-3 rounded-2xl bg-lichen-deep p-3 text-base">
        <strong>Kleingarten:</strong> {{ criterion.allotmentNote }}
      </p>
    </template>

    <template #result>
      <section class="mt-8" aria-labelledby="bonus">
        <h3 id="bonus" class="font-serif text-2xl font-bold">Bonuspunkte</h3>
        <p class="mt-1 max-w-[60ch]">Sie werden bei der Begehung notiert, zählen aber nicht zu den Pflichtpunkten:</p>
        <ul class="mt-2 list-disc pl-5">
          <li v-for="item in bonus" :key="item">{{ item }}</li>
        </ul>
      </section>
    </template>

    <template #next>
      <p class="mt-2">
        Die Plakette vergibt der
        <a class="font-bold underline" href="https://www.gartenfreunde-landesverband-bw.de" target="_blank" rel="noopener">Landesverband der Gartenfreunde Baden-Württemberg</a>
        nach einer einmaligen Gartenbegehung. Kontakt: <a class="font-bold underline" href="mailto:info@landesverband-bw.de">info@landesverband-bw.de</a>
      </p>
      <p class="mt-2 text-base">
        Die Zertifizierung kostet einen Beitrag, dazu kommen Plakette, Urkunde und Fahrtkosten. Mitglieder zahlen weniger. Die aktuelle Höhe erfährst du beim Landesverband.
      </p>
      <p class="mt-2 text-base">
        Die Plakette ist eine Momentaufnahme. Erfüllt dein Garten die Kriterien später nicht mehr, bittet der Verband, sie abzunehmen.
      </p>
      <p class="mt-2 text-base">Grundlage ist das {{ CRITERIA_VERSION }}. Dieser Check ist kein offizielles Angebot und ersetzt keine Begehung.</p>
    </template>
  </TieredCheck>
</template>
