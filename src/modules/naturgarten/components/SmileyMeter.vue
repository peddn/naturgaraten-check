<script setup>
import SmileyIcon from './SmileyIcon.vue'

defineProps({
  score: { type: Number, required: true },
  required: { type: Number, default: 7 },
  max: { type: Number, default: 14 },
})
</script>

<template>
  <div class="flex items-center gap-0.5 text-[1.05rem]" aria-hidden="true">
    <template v-for="n in max" :key="n">
      <SmileyIcon :class="n <= score ? 'text-pollen' : 'text-current opacity-20'" />
      <span v-if="n === required" class="mx-1 h-5 w-0.5 rounded bg-current opacity-60" />
    </template>
  </div>
</template>
