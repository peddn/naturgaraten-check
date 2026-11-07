import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { stateByCode } from './regions.js'

const KEY = 'naturgarten-check:region'

function read() {
  try {
    return stateByCode(globalThis.localStorage.getItem(KEY))?.code ?? null
  } catch {
    return null
  }
}

// Merkt sich das gewählte Bundesland nur in diesem Browser.
export const useRegionStore = defineStore('region', () => {
  const code = ref(read())
  const state = computed(() => stateByCode(code.value))

  watch(code, (value) => {
    try {
      globalThis.localStorage.setItem(KEY, value ?? '')
    } catch {
      // Ohne Speicher gilt die Wahl nur bis zum Neuladen.
    }
  })

  return { code, state }
})
