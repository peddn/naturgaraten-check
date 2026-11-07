<script setup>
import { computed } from 'vue'
import { plants } from '../../shared/art/plants.js'
import SceneGround from '../../shared/components/SceneGround.vue'
import { groups } from './criteria.js'

// Garten mit Haus: Pflanzen für Elemente und Bewirtschaftung, am Haus die Klimamaßnahmen.
const props = defineProps({
  state: { type: Object, required: true },
  result: { type: Object, required: true },
})

const has = (id) => props.state.checked.includes(id)

const rows = [
  { group: groups[0], y: 212, from: 150, to: 450 },
  { group: groups[1], y: 288, from: 34, to: 446 },
]

const slots = computed(() =>
  rows.flatMap(({ group, y, from, to }) => {
    const items = group.criteria.filter((c) => c.art)
    const step = (to - from) / (items.length - 1)
    return items.map((c, i) => ({ id: c.id, x: from + i * step, y, art: has(c.id) ? plants[c.art][1] : '' }))
  }),
)

// Zwei Strahlen je erfülltem Pflichtkriterium (3 Kern- und 2 Grundkriterien).
const fulfilled = computed(() =>
  [...Object.values(props.state.core), ...Object.values(props.state.basics)].filter((v) => v === true).length,
)
const description = computed(() => `Gartenbild mit ${props.result.count} erfüllten Kriterien.`)
</script>

<template>
  <svg viewBox="0 0 480 320" class="block h-auto w-full" role="img" :aria-label="description">
    <g transform="translate(404 62)">
      <path
        v-for="n in 10"
        :key="n"
        d="M0 -34V-50"
        :transform="`rotate(${n * 36})`"
        stroke-width="5"
        stroke-linecap="round"
        :stroke="n <= fulfilled * 2 ? '#edb92e' : '#4a6a55'"
        class="transition-[stroke] duration-500"
      />
      <circle r="26" :fill="fulfilled === 5 ? '#edb92e' : '#4a6a55'" class="transition-[fill] duration-500" />
    </g>

    <g v-if="has('klimabaeume')" transform="translate(132 180)" class="grow-up" v-html="plants.baum[1]" />
    <g transform="translate(28 96)">
      <rect y="24" width="76" height="62" fill="#d9cdb4" />
      <path d="M-8 26L38 -6L84 26Z" :fill="has('dach') ? '#5f9a45' : '#8f6a4a'" class="transition-[fill] duration-500" />
      <g v-if="has('dach')" class="grow-up">
        <circle cx="22" cy="12" r="2.2" fill="#edb92e" /><circle cx="44" cy="6" r="2.2" fill="#fbfdf4" /><circle cx="58" cy="16" r="2.2" fill="#8d6bb5" />
      </g>
      <rect x="44" y="52" width="18" height="34" fill="#7a5639" />
      <rect x="12" y="40" width="18" height="16" fill="#7fb7c9" />
      <g v-if="has('fassade')" class="grow-up">
        <path d="M2 86C4 66 0 52 6 36M70 86c-2-18 3-34-2-50" stroke="#3f7a3a" stroke-width="3" fill="none" />
        <circle cx="4" cy="70" r="4" fill="#5f9a45" /><circle cx="7" cy="50" r="4" fill="#3f7a3a" /><circle cx="69" cy="64" r="4" fill="#5f9a45" /><circle cx="67" cy="44" r="4" fill="#3f7a3a" />
      </g>
      <g v-if="has('regenwasser')" transform="translate(88 86)" class="grow-up" v-html="plants.regen[0]" />
    </g>
    <SceneGround />
    <g v-if="has('versickerung')" class="grow-up">
      <rect v-for="n in 5" :key="n" :x="58 + n * 12" y="234" width="9" height="5" rx="1.5" fill="#a8ad9c" />
    </g>
    <g v-for="slot in slots" :key="slot.id" :transform="`translate(${slot.x} ${slot.y})`">
      <g v-if="!slot.art">
        <ellipse rx="8" ry="2.6" fill="#2c5039" opacity=".55" />
      </g>
      <g v-else class="grow-up" v-html="slot.art" />
    </g>
  </svg>
</template>
