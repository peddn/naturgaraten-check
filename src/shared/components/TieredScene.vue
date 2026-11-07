<script setup>
import { computed } from 'vue'
import { plants } from '../art/plants.js'
import SceneGround from './SceneGround.vue'

// Gartenbild für Module nach dem Muster „Stufen“. Jedes Kriterium nennt in `art`
// eine Zeichnung aus plants.js, die Sonne zeigt die Kernkriterien.
const props = defineProps({
  config: { type: Object, required: true },
  state: { type: Object, required: true },
  result: { type: Object, required: true },
  rating: { type: Function, required: true },
})

const rowsY = [212, 288]

const slots = computed(() =>
  props.config.categories.slice(0, 2).flatMap((category, row) => {
    const count = category.criteria.length
    const margin = 40
    const step = (480 - 2 * margin) / Math.max(1, count - 1)
    return category.criteria.map((criterion, index) => {
      const stage = props.rating(criterion.id) ?? 0
      return {
        id: criterion.id,
        stage,
        x: margin + index * step,
        y: rowsY[row],
        art: stage > 0 ? plants[criterion.art]?.[stage - 1] ?? '' : '',
      }
    })
  }),
)

const rays = computed(() =>
  props.result.core.map((criterion, index, all) => ({
    id: criterion.id,
    angle: (index * 360) / all.length,
    value: criterion.value,
  })),
)

const description = computed(() => {
  const done = props.result.core.filter((c) => c.value === true).length
  const scores = props.result.categories.map((c) => `${c.score} Punkte bei ${c.title}`).join(', ')
  return `Gartenbild: ${done} von ${props.result.core.length} Kernkriterien erfüllt, ${scores}.`
})
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="description">
    <g transform="translate(404 62)">
      <g v-for="ray in rays" :key="ray.id" :transform="`rotate(${ray.angle})`">
        <path
          v-for="spread in [-16, 0, 16]"
          :key="spread"
          d="M0 -34V-52"
          :transform="`rotate(${spread})`"
          stroke-width="5"
          stroke-linecap="round"
          :stroke="ray.value === true ? '#edb92e' : ray.value === false ? '#a93428' : '#4a6a55'"
          class="transition-[stroke] duration-500"
        />
      </g>
      <circle r="26" :fill="result.core.every((c) => c.value === true) ? '#edb92e' : '#4a6a55'" class="transition-[fill] duration-500" />
    </g>
    <SceneGround />
    <g v-for="slot in slots" :key="slot.id" :transform="`translate(${slot.x} ${slot.y})`">
      <g v-if="slot.stage === 0">
        <ellipse cx="0" cy="0" rx="8" ry="2.6" fill="#2c5039" opacity=".55" />
        <circle cx="0" cy="-1.5" r="1.8" fill="#a9cf6e" opacity=".8" />
      </g>
      <g v-else :key="slot.stage" class="grow-up" v-html="slot.art" />
    </g>
  </svg>
</template>
