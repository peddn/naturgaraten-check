<script setup>
import { computed } from 'vue'
import { icons } from '../art/icons.js'

// Gartenzaun mit einer Plakette je Angebot. Erfüllte Angebote leuchten.
const props = defineProps({
  plaques: { type: Array, required: true },
})

const spaced = computed(() => {
  const count = Math.min(props.plaques.length, 5)
  const step = 480 / (count + 1)
  return props.plaques.slice(0, 5).map((plaque, index) => ({ ...plaque, x: step * (index + 1) }))
})

const radius = computed(() => (spaced.value.length > 3 ? 30 : 38))
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="`Gartenzaun mit ${plaques.length} Plaketten`">
    <path d="M0 232Q160 206 300 226T480 216V320H0Z" fill="#3f7a3a" />
    <path d="M0 270Q140 256 280 268T480 262V320H0Z" fill="#5a4030" />
    <g fill="#b98d5e">
      <path v-for="n in 13" :key="n" :d="`M${-8 + (n - 1) * 41} 278V146l11-14 11 14V278Z`" />
    </g>
    <path d="M0 170H480M0 244H480" stroke="#7a5639" stroke-width="10" />
    <g v-for="plaque in spaced" :key="plaque.id" :transform="`translate(${plaque.x} 196)`">
      <circle :r="radius" :fill="plaque.lit ? '#edb92e' : '#2c5039'" stroke="#fbfdf4" stroke-width="4" class="transition-[fill] duration-500" />
      <path :d="icons[plaque.icon] ?? icons.leaf" :transform="`scale(${radius / 22})`" :fill="plaque.lit ? '#1e3a2a' : '#a9cf6e'" stroke-linecap="round" :stroke="plaque.lit ? '#1e3a2a' : '#a9cf6e'" stroke-width=".6" />
    </g>
  </svg>
</template>
