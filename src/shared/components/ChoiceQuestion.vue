<script setup>
const props = defineProps({
  criterion: { type: Object, required: true },
  modelValue: { type: null, default: null },
  options: {
    type: Array,
    default: () => [
      { value: true, label: 'Ja', tone: 'good' },
      { value: false, label: 'Nein', tone: 'bad' },
    ],
  },
})
defineEmits(['update:modelValue'])

const tones = {
  good: 'bg-leaf text-paper border-leaf',
  bad: 'bg-rosehip text-paper border-rosehip',
  warn: 'bg-pollen text-fir border-pollen',
}
</script>

<template>
  <fieldset class="border-b-2 border-lichen-deep py-6 first:pt-0 last:border-b-0">
    <legend class="contents">
      <span class="block font-serif text-2xl font-bold leading-tight">{{ criterion.title }}</span>
      <span v-if="criterion.question" class="mt-1 block">{{ criterion.question }}</span>
    </legend>
    <p v-if="criterion.hint" class="mt-2 max-w-[68ch] text-base text-fir-soft">{{ criterion.hint }}</p>
    <div class="mt-3 flex flex-wrap gap-2">
      <label
        v-for="option in props.options"
        :key="option.label"
        class="cursor-pointer rounded-full border-2 px-6 py-1.5 font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pollen"
        :class="modelValue === option.value ? tones[option.tone] : 'border-leaf/50 bg-paper hover:border-leaf'"
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
