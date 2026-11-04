<script setup>
import { computed } from 'vue'
import SmileyIcon from './SmileyIcon.vue'

const props = defineProps({
  criterion: { type: Object, required: true },
  modelValue: { type: Number, default: null },
  blocked: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])

const levels = computed(() => [
  { value: 0, title: 'Noch nicht', text: 'Das gibt es bei mir nicht.', smileys: 0 },
  { value: 1, title: 'Teilweise', text: props.criterion.partial, smileys: 1 },
  { value: 2, title: 'Voll erfüllt', text: props.criterion.full, smileys: 2 },
])
</script>

<template>
  <fieldset class="border-b-2 border-lichen-deep py-6 first:pt-0 last:border-b-0">
    <legend class="contents">
      <span class="block font-serif text-2xl font-bold leading-tight">{{ criterion.title }}</span>
    </legend>
    <div class="mt-3 grid gap-2 md:grid-cols-3">
      <label
        v-for="level in levels"
        :key="level.value"
        class="flex items-start gap-3 rounded-2xl border-2 p-3 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pollen md:flex-col md:gap-1"
        :class="[
          modelValue === level.value
            ? 'border-fir bg-fir text-paper [--smiley-face:#1e3a2a]'
            : 'border-lichen-deep bg-paper',
          blocked && level.value > 0
            ? 'cursor-not-allowed opacity-45'
            : 'cursor-pointer hover:border-leaf',
          modelValue === level.value ? 'hover:border-fir' : '',
        ]"
      >
        <input
          type="radio"
          class="sr-only"
          :name="criterion.id"
          :checked="modelValue === level.value"
          :disabled="blocked && level.value > 0"
          @change="$emit('update:modelValue', level.value)"
        />
        <span class="flex h-6 w-11 shrink-0 items-center gap-0.5 text-[1.3rem] md:w-auto">
          <SmileyIcon
            v-for="n in level.smileys"
            :key="n"
            :class="modelValue === level.value ? 'text-pollen' : 'text-leaf'"
          />
          <svg v-if="level.smileys === 0" viewBox="0 0 24 24" class="size-[1em]" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3.5" />
          </svg>
        </span>
        <span>
          <span class="block font-bold leading-snug">{{ level.title }}</span>
          <span class="block text-base leading-snug">{{ level.text }}</span>
        </span>
      </label>
    </div>
    <p v-if="criterion.hint" class="mt-2 max-w-[68ch] text-base text-fir-soft">{{ criterion.hint }}</p>
    <slot />
  </fieldset>
</template>
