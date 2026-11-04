<script setup>
defineProps({
  criterion: { type: Object, required: true },
  modelValue: { type: Boolean, default: null },
})
defineEmits(['update:modelValue'])

const options = [
  { value: true, label: 'Ja', on: 'bg-leaf text-paper border-leaf' },
  { value: false, label: 'Nein', on: 'bg-rosehip text-paper border-rosehip' },
]
</script>

<template>
  <fieldset class="border-b-2 border-lichen-deep py-6 first:pt-0 last:border-b-0">
    <legend class="contents">
      <span class="block font-serif text-2xl font-bold leading-tight">{{ criterion.title }}</span>
      <span class="mt-1 block">{{ criterion.question }}</span>
    </legend>
    <p class="mt-2 max-w-[68ch] text-base text-fir-soft">{{ criterion.hint }}</p>
    <div class="mt-3 flex gap-2">
      <label
        v-for="option in options"
        :key="option.label"
        class="cursor-pointer rounded-full border-2 px-6 py-1.5 font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pollen"
        :class="modelValue === option.value ? option.on : 'border-leaf/50 bg-paper hover:border-leaf'"
      >
        <input
          type="radio"
          class="sr-only"
          :name="criterion.id"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        />
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>
