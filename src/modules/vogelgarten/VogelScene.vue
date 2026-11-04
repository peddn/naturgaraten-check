<script setup>
import { computed } from 'vue'
import { plants } from '../../shared/art/plants.js'
import SceneGround from '../../shared/components/SceneGround.vue'

const props = defineProps({
  state: { type: Object, required: true },
  result: { type: Object, required: true },
})

const items = computed(() =>
  [
    { id: 'wildeEcke', art: plants.wildesEck[1], x: 66, y: 232 },
    { id: 'insekten', art: plants.blumen[1], x: 196, y: 214 },
    { id: 'fruechte', art: plants.obst[1], x: 318, y: 226 },
    { id: 'nistmaterial', art: plants.nuetzlinge[1], x: 416, y: 214 },
  ].filter((item) => props.state.must[item.id] === true),
)

const birdSpots = [
  { x: 120, y: 86, color: '#edb92e', flip: 1 },
  { x: 232, y: 52, color: '#fbfdf4', flip: -1 },
  { x: 318, y: 112, color: '#c8503c', flip: 1 },
  { x: 402, y: 62, color: '#a9cf6e', flip: -1 },
]

// Bei einem Ausschlusskriterium fliegen die Vögel davon.
const birds = computed(() =>
  props.result.status === 'excluded' ? [] : birdSpots.slice(0, props.result.met.length),
)

const description = computed(
  () => `Gartenbild: ${props.result.met.length} Musskriterien erfüllt, ${props.result.excluded.length} Ausschlusskriterien treffen zu.`,
)
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="description">
    <SceneGround />
    <g v-for="item in items" :key="item.id" :transform="`translate(${item.x} ${item.y})`">
      <g class="grow-up" v-html="item.art" />
    </g>
    <g
      v-for="bird in birds"
      :key="bird.x"
      :transform="`translate(${bird.x} ${bird.y}) scale(${bird.flip} 1)`"
    >
      <g class="grow-up">
        <path d="M-18 4Q-6 -10 12 -4L24 -10L20 2Q8 14 -8 10Z" :fill="bird.color" />
        <circle cx="-14" cy="-3" r="8" :fill="bird.color" />
        <path d="M-21 -4l-8 3l8 2Z" fill="#edb92e" stroke="#1e3a2a" stroke-width="1" />
        <circle cx="-16" cy="-5" r="1.5" fill="#1e3a2a" />
        <path d="M-4 0Q8 -16 18 -18Q14 -2 2 4Z" fill="#2c5039" opacity=".55" />
      </g>
    </g>
  </svg>
</template>
