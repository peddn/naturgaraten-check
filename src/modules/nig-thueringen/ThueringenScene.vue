<script setup>
import { computed } from 'vue'
import { plants } from '../../shared/art/plants.js'
import SceneGround from '../../shared/components/SceneGround.vue'
import { core, groups } from './criteria.js'

const props = defineProps({
  state: { type: Object, required: true },
})

const rows = [
  { group: groups[0], y: 212, from: 40, to: 440 },
  { group: groups[1], y: 288, from: 34, to: 446 },
]

const slots = computed(() =>
  rows.flatMap(({ group, y, from, to }) => {
    const step = (to - from) / (group.criteria.length - 1)
    return group.criteria.map((c, i) => ({
      id: c.id,
      x: from + i * step,
      y,
      art: props.state.present.includes(c.id) ? plants[c.art][1] : '',
    }))
  }),
)

const rays = computed(() => core.map((c, i) => ({ id: c.id, angle: i * 120, value: props.state.must[c.id] })))
const description = computed(() => `Gartenbild mit ${props.state.present.length} vorhandenen Elementen.`)
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
      <circle r="26" :fill="rays.every((r) => r.value === true) ? '#edb92e' : '#4a6a55'" class="transition-[fill] duration-500" />
    </g>
    <SceneGround />
    <g v-for="slot in slots" :key="slot.id" :transform="`translate(${slot.x} ${slot.y})`">
      <ellipse v-if="!slot.art" rx="8" ry="2.6" fill="#2c5039" opacity=".55" />
      <g v-else class="grow-up" v-html="slot.art" />
    </g>
  </svg>
</template>
