<script setup>
import { computed } from 'vue'
import { modules } from '../modules/index.js'
import ModuleLayout from '../shared/components/ModuleLayout.vue'

const entries = computed(() => modules.map((module) => ({ module, summary: module.useStore().summary })))

const badge = {
  ready: 'bg-leaf text-paper',
  missing: 'bg-rosehip text-paper',
  open: 'bg-lichen-deep text-fir',
}

const signs = computed(() =>
  entries.value.map(({ module, summary }, index) => ({
    id: module.id,
    x: 96 + index * 144,
    lit: summary.status === 'ready',
  })),
)
const icons = {
  naturgarten: 'M0 13V-3M0 4c-8 0-11-5-11-11 8 0 11 5 11 11Zm0-4c0-7 4-11 11-11 0 7-4 11-11 11Z',
  vogelgarten: 'M-13 3Q-4-9 8-5L15-9l-3 8Q5 10-5 8ZM-9-1a6 6 0 1 1 .1 0Z',
  praemierung: 'M0-13l4 8 9 1-6.5 6.5L8 12l-8-4-8 4 1.5-9.500L-13-4l9-1Z',
}
</script>

<template>
  <ModuleLayout
    title="Welche Plakette passt zu deinem Garten?"
    lead="Drei Auszeichnungen, drei Checks. Deine Antworten bleiben in deinem Browser."
  >
    <template #scene>
      <svg viewBox="0 0 480 320" class="block h-auto w-full lg:max-h-full" role="img" aria-label="Gartenzaun mit drei Plaketten">
        <path d="M0 232Q160 206 300 226T480 216V320H0Z" fill="#3f7a3a" />
        <path d="M0 270Q140 256 280 268T480 262V320H0Z" fill="#5a4030" />
        <g fill="#b98d5e">
          <path v-for="n in 13" :key="n" :d="`M${-8 + (n - 1) * 41} 278V146l11-14 11 14V278Z`" />
        </g>
        <path d="M0 170H480M0 244H480" stroke="#7a5639" stroke-width="10" />
        <g v-for="sign in signs" :key="sign.id" :transform="`translate(${sign.x} 196)`">
          <circle r="38" :fill="sign.lit ? '#edb92e' : '#2c5039'" stroke="#fbfdf4" stroke-width="4" class="transition-[fill] duration-500" />
          <path :d="icons[sign.id]" transform="scale(1.7)" :fill="sign.lit ? '#1e3a2a' : '#a9cf6e'" />
        </g>
      </svg>
    </template>

    <h2 class="mt-8 font-serif text-4xl font-bold leading-tight md:text-5xl">Wähle einen Check</h2>
    <ul class="mt-6">
      <li v-for="{ module, summary } in entries" :key="module.id" class="border-b-2 border-lichen-deep py-5 last:border-b-0">
        <RouterLink :to="module.path" class="group block">
          <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span class="font-serif text-2xl font-bold leading-tight group-hover:underline">{{ module.title }}</span>
            <span class="rounded-full px-3 text-base font-bold" :class="badge[summary.status]">{{ summary.label }}</span>
          </span>
          <span class="mt-1 block max-w-[60ch]">{{ module.description }}</span>
          <span class="mt-1 block text-base text-fir-soft">{{ module.region }}. Dein Stand: {{ summary.detail }}.</span>
        </RouterLink>
      </li>
    </ul>
    <p class="mt-6 max-w-[60ch] text-base text-fir-soft">
      Das ist kein offizielles Angebot. Die Checks sind Selbsteinschätzungen, die Entscheidung treffen immer die jeweiligen Prüfer vor Ort.
    </p>
  </ModuleLayout>
</template>
