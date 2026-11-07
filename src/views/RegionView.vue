<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { modules } from '../modules/index.js'
import ModuleLayout from '../shared/components/ModuleLayout.vue'
import ModuleList from '../shared/components/ModuleList.vue'
import PlaqueFence from '../shared/components/PlaqueFence.vue'
import { modulesForState, stateBySlug } from '../shared/regions.js'
import { useRegionStore } from '../shared/regionStore.js'

const route = useRoute()
const region = useRegionStore()
const state = computed(() => stateBySlug(route.params.slug))

// Ein direkt aufgerufener Link merkt sich das Land ebenfalls.
watchEffect(() => {
  if (state.value) region.code = state.value.code
})

const offers = computed(() => modulesForState(modules, state.value.code))
const plaques = computed(() =>
  [...offers.value.regional, ...offers.value.nationwide].map((module) => ({
    id: module.id,
    icon: module.icon,
    lit: module.useStore().summary.status === 'ready',
  })),
)
</script>

<template>
  <ModuleLayout
    :title="`Gartenplaketten in ${state.name}`"
    lead="Wähle eine Auszeichnung und prüfe deinen Garten. Deine Antworten bleiben in deinem Browser."
  >
    <template #scene>
      <PlaqueFence class="lg:max-h-full" :plaques="plaques" />
    </template>

    <template v-if="offers.regional.length">
      <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Nur in {{ state.name }}</h2>
      <ModuleList class="mt-4" :modules="offers.regional" />
    </template>

    <section v-else class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="no-offer">
      <h2 id="no-offer" class="font-serif text-3xl font-bold leading-tight">
        Für {{ state.name }} kennen wir noch keine eigene Plakette.
      </h2>
      <p class="mt-2 max-w-[60ch]">
        <template v-if="offers.nationwide.length">Du musst trotzdem nicht verzichten: Die Auszeichnungen unten stehen Gärten in ganz Deutschland offen.</template>
        <template v-else>Schau gern später wieder vorbei, wir ergänzen laufend neue Auszeichnungen.</template>
        Lokale Angebote deiner Stadt oder deines Landkreises erfährst du bei der Gemeinde oder beim örtlichen Gartenbauverein.
      </p>
    </section>

    <template v-if="offers.nationwide.length">
      <h2 class="mt-10 font-serif text-4xl font-bold leading-tight md:text-5xl">Bundesweit</h2>
      <ModuleList class="mt-4" :modules="offers.nationwide" />
    </template>

    <RouterLink to="/" class="mt-8 inline-block font-bold underline decoration-leaf underline-offset-2">Anderes Bundesland wählen</RouterLink>
  </ModuleLayout>
</template>
