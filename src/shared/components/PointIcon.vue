<script setup>
// Ein Bewertungspunkt: Smiley wie in Bayern oder Stern wie bei „Natur im Garten“.
defineProps({ shape: { type: String, default: 'smiley' } })
</script>

<template>
  <svg viewBox="0 0 24 24" class="size-[1em] shrink-0" aria-hidden="true">
    <template v-if="shape === 'star'">
      <path d="M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.9l-6.4 3.5 1.4-7.1-5.3-5 7.2-.9Z" fill="currentColor" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <circle cx="8.5" cy="10" r="1.4" fill="var(--smiley-face, #f6f9ee)" />
      <circle cx="15.5" cy="10" r="1.4" fill="var(--smiley-face, #f6f9ee)" />
      <path d="M7.5 14.5q4.5 4.5 9 0" fill="none" stroke="var(--smiley-face, #f6f9ee)" stroke-width="1.8" stroke-linecap="round" />
    </template>
  </svg>
</template>
