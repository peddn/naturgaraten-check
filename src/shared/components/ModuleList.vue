<script setup>
import { computed } from 'vue'

const props = defineProps({
  modules: { type: Array, required: true },
})

const entries = computed(() => props.modules.map((module) => ({ module, summary: module.useStore().summary })))

const badge = {
  ready: 'bg-leaf text-paper',
  missing: 'bg-rosehip text-paper',
  open: 'bg-lichen-deep text-fir',
}
</script>

<template>
  <ul>
    <li v-for="{ module, summary } in entries" :key="module.id" class="border-b-2 border-lichen-deep py-5 last:border-b-0">
      <RouterLink :to="module.path" class="group block">
        <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span class="font-serif text-2xl font-bold leading-tight group-hover:underline">{{ module.title }}</span>
          <span class="rounded-full px-3 text-base font-bold" :class="badge[summary.status]">{{ summary.label }}</span>
        </span>
        <span class="mt-1 block max-w-[60ch]">{{ module.description }}</span>
        <span class="mt-1 block text-base text-fir-soft">
          <template v-if="module.regionNote">{{ module.regionNote }}. </template>Dein Stand: {{ summary.detail }}.
        </span>
      </RouterLink>
    </li>
  </ul>
</template>
