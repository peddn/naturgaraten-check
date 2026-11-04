<script setup>
defineProps({
  tone: { type: String, default: 'open' },
  title: { type: String, required: true },
})

const tones = {
  good: 'bg-leaf text-paper',
  bad: 'bg-rosehip text-paper',
  open: 'bg-lichen-deep text-fir',
}
</script>

<template>
  <section class="mt-8 rounded-3xl p-5" :class="tones[tone]" aria-live="polite">
    <h2 class="font-serif text-3xl font-bold leading-tight">{{ title }}</h2>
    <div class="mt-2 max-w-[60ch]"><slot /></div>
  </section>
</template>
