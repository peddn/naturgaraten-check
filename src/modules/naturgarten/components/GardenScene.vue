<script setup>
import { computed } from 'vue'
import SceneGround from '../../../shared/components/SceneGround.vue'
import { categories } from '../criteria.js'
import { plants } from '../../../shared/art/plants.js'
import { effectiveRating } from '../scoring.js'

const props = defineProps({
  state: { type: Object, required: true },
  result: { type: Object, required: true },
})

const rows = [
  { category: categories[0], y: 212, start: 50, step: 64 },
  { category: categories[1], y: 288, start: 34, step: 69 },
]

const slots = computed(() =>
  rows.flatMap((row) =>
    row.category.criteria.map((criterion, index) => {
      const stage = effectiveRating(props.state, criterion.id) ?? 0
      return {
        id: criterion.id,
        stage,
        x: row.start + index * row.step,
        y: row.y,
        art: stage > 0 ? plants[criterion.id][stage - 1] : '',
      }
    }),
  ),
)

// Jedes Kernkriterium ist ein Strahlenbündel der Sonne.
const sunRays = computed(() =>
  props.result.core.map((criterion, index) => ({
    id: criterion.id,
    angle: index * 90 - 45,
    value: criterion.value,
  })),
)

const description = computed(() => {
  const [first, second] = props.result.categories
  const coreDone = props.result.core.filter((c) => c.value === true).length
  return `Gartenbild: ${coreDone} von 4 Grundregeln erfüllt, ${first.score} Smileys bei den Naturgartenelementen und ${second.score} bei Bewirtschaftung und Nutzgarten.`
})
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="description">
    <g transform="translate(404 62)">
      <g v-for="ray in sunRays" :key="ray.id" :transform="`rotate(${ray.angle})`">
        <path
          v-for="spread in [-18, 0, 18]"
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
