import { reactive, ref, watch } from 'vue'
import { loadAnswers, saveAnswers } from './storage.js'

// Gemeinsame Speicherlogik der Modul-Stores: Jedes Modul hat einen eigenen Schlüssel.
export function usePersistedAnswers({ key, createEmpty, sanitize }) {
  const answers = reactive(loadAnswers(key, createEmpty, sanitize))
  const saved = ref(saveAnswers(key, answers))

  watch(
    answers,
    (value) => {
      saved.value = saveAnswers(key, value)
    },
    { deep: true },
  )

  function replace(raw) {
    Object.assign(answers, sanitize(raw))
  }

  function reset() {
    Object.assign(answers, createEmpty())
  }

  return { answers, saved, replace, reset }
}
