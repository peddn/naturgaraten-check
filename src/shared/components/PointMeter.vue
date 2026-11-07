<script setup>
import PointIcon from './PointIcon.vue'

defineProps({
  score: { type: Number, required: true },
  required: { type: Number, default: 7 },
  max: { type: Number, default: 14 },
  shape: { type: String, default: 'smiley' },
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-0.5 text-[1.05rem]" aria-hidden="true">
    <template v-for="n in max" :key="n">
      <PointIcon :shape="shape" :class="n <= score ? 'text-pollen' : 'text-current opacity-20'" />
      <span v-if="n === required" class="mx-1 h-5 w-0.5 rounded bg-current opacity-60" />
    </template>
  </div>
</template>
