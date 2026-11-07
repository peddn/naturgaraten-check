<script setup>
import { useRouter } from 'vue-router'
import ModuleLayout from '../shared/components/ModuleLayout.vue'
import { states } from '../shared/regions.js'
import { useRegionStore } from '../shared/regionStore.js'

const region = useRegionStore()
const router = useRouter()

function choose(state) {
  region.code = state.code
  router.push(`/land/${state.slug}`)
}
</script>

<template>
  <ModuleLayout
    title="Welche Plakette passt zu deinem Garten?"
    lead="Wähle dein Bundesland. Dann siehst du, welche ökologischen Gartenauszeichnungen es dort gibt, und kannst deinen Garten selbst prüfen."
  >
    <template #scene>
      <svg viewBox="0 0 480 320" class="block h-auto w-full lg:max-h-full" role="img" aria-label="Wegweiser im Garten">
        <path d="M0 232Q160 206 300 226T480 216V320H0Z" fill="#3f7a3a" />
        <path d="M0 270Q140 256 280 268T480 262V320H0Z" fill="#5a4030" />
        <rect x="232" y="96" width="14" height="168" rx="3" fill="#7a5639" />
        <path d="M160 108h120l22 18-22 18H160Z" fill="#b98d5e" />
        <path d="M318 154H198l-22 18 22 18h120Z" fill="#b98d5e" />
        <path d="M172 200h112l20 16-20 16H172Z" fill="#b98d5e" />
        <g fill="#5a4030">
          <rect x="176" y="122" width="88" height="6" rx="3" />
          <rect x="214" y="168" width="88" height="6" rx="3" />
          <rect x="188" y="213" width="80" height="6" rx="3" />
        </g>
        <g transform="translate(96 250)"><circle r="6" fill="#edb92e" /><circle cy="-14" r="6" fill="#fbfdf4" /><path d="M0 0v24" stroke="#2c5039" stroke-width="2.5" /></g>
        <g transform="translate(372 244)"><circle r="7" fill="#8d6bb5" /><path d="M0 0v28" stroke="#2c5039" stroke-width="2.5" /></g>
      </svg>
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Wo liegt dein Garten?</h2>
    <ul class="mt-6 grid gap-2 sm:grid-cols-2">
      <li v-for="state in states" :key="state.code">
        <button
          type="button"
          class="w-full rounded-2xl border-2 px-4 py-2.5 text-left font-bold transition-colors"
          :class="region.code === state.code ? 'border-fir bg-fir text-paper' : 'border-lichen-deep bg-paper hover:border-leaf'"
          :aria-current="region.code === state.code ? 'true' : undefined"
          @click="choose(state)"
        >
          {{ state.name }}
        </button>
      </li>
    </ul>
    <p class="mt-6 max-w-[60ch] text-base text-fir-soft">
      Das ist kein offizielles Angebot. Die Checks sind Selbsteinschätzungen, die Entscheidung treffen immer die jeweiligen Prüfer vor Ort.
    </p>
  </ModuleLayout>
</template>
