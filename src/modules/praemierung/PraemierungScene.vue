<script setup>
import { computed } from 'vue'
import { plants } from '../../shared/art/plants.js'
import SceneGround from '../../shared/components/SceneGround.vue'

const props = defineProps({
  state: { type: Object, required: true },
  result: { type: Object, required: true },
})

const sandArt = '<ellipse cx="0" cy="-3" rx="24" ry="6" fill="#e3cf97"/><circle cx="-8" cy="-5" r="1.4" fill="#2c5039"/><circle cx="7" cy="-4" r="1.4" fill="#2c5039"/>'
const wallArt = [0, 1, 2]
  .flatMap((row) => [0, 1, 2, 3].map((col) => `<rect x="${-26 + col * 13 + (row % 2) * 5}" y="${-9 - row * 8}" width="12" height="7" rx="2" fill="#a8ad9c"/>`))
  .join('')
const stoneArt = '<circle cx="-11" cy="-7" r="8" fill="#a8ad9c"/><circle cx="6" cy="-8" r="10" fill="#8f9587"/><circle cx="-2" cy="-17" r="7" fill="#b9bdae"/>'

const spots = {
  totholz: { art: plants.wildesEck[1], x: 54, y: 228 },
  teich: { art: plants.lebensraum[1], x: 182, y: 214 },
  wiese: { art: plants.wiese[1], x: 316, y: 220 },
  sand: { art: sandArt, x: 412, y: 216 },
  trockenmauer: { art: wallArt, x: 118, y: 288 },
  steinhaufen: { art: stoneArt, x: 352, y: 288 },
}

const items = computed(() => props.state.biotopes.map((id) => ({ id, ...spots[id] })))

const medal = computed(
  () =>
    ({
      bronze: { fill: '#b98150', ring: '#e3b98c' },
      oasis: { fill: '#3f7a3a', ring: '#a9cf6e' },
    })[props.result.status] ?? { fill: '#4a6a55', ring: '#4a6a55' },
)

const description = computed(() => `Gartenbild mit ${props.result.biotopeCount} Biotopelementen.`)
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="description">
    <g transform="translate(396 72)">
      <path d="M-14 -46L-4 -30M14 -46L4 -30" stroke="#a9cf6e" stroke-width="7" stroke-linecap="round" />
      <circle r="32" :fill="medal.fill" class="transition-[fill] duration-500" />
      <circle r="24" fill="none" :stroke="medal.ring" stroke-width="3" class="transition-[stroke] duration-500" />
      <path d="M0 13V-2M0 3c-8 0-11-5-11-11 8 0 11 5 11 11Zm0-4c0-7 4-11 11-11 0 7-4 11-11 11Z" :fill="medal.ring" class="transition-[fill] duration-500" />
    </g>
    <SceneGround />
    <g v-for="item in items" :key="item.id" :transform="`translate(${item.x} ${item.y})`">
      <g class="grow-up" v-html="item.art" />
    </g>
  </svg>
</template>
