<script setup>
import { modules } from '../../modules/index.js'
import DataTools from './DataTools.vue'

defineProps({
  title: { type: String, required: true },
  lead: { type: String, required: true },
})
</script>

<template>
  <div class="lg:grid lg:min-h-dvh lg:grid-cols-[minmax(24rem,5fr)_7fr]">
    <aside class="bg-fir text-lichen lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
      <header class="px-4 pt-5 sm:px-8 lg:pt-8">
        <nav aria-label="Checks" class="flex flex-wrap gap-x-4 gap-y-1">
          <RouterLink to="/" class="font-bold text-sprout hover:text-paper" active-class="" exact-active-class="underline underline-offset-4">Garten-Check</RouterLink>
          <RouterLink
            v-for="module in modules"
            :key="module.id"
            :to="module.path"
            class="hover:text-paper"
            active-class="text-paper underline underline-offset-4"
          >
            {{ module.navLabel }}
          </RouterLink>
        </nav>
        <h1 class="mt-4 max-w-[17ch] font-serif text-4xl font-bold leading-[1.08] text-paper xl:text-5xl">
          {{ title }}
        </h1>
        <p class="mt-3 max-w-[42ch]">{{ lead }}</p>
      </header>
      <div class="mt-4 lg:flex lg:min-h-0 lg:flex-1 lg:items-end">
        <slot name="scene" />
      </div>
    </aside>

    <main id="check" class="px-4 pb-12 sm:px-8 lg:px-14">
      <div class="mx-auto max-w-3xl">
        <slot />
        <DataTools />
      </div>
    </main>
  </div>
</template>
