import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistedAnswers } from './usePersistedAnswers.js'

// Store für Module, die ein gemeinsames Bewertungsmuster nutzen.
// summarize(result) liefert { status: 'ready' | 'missing' | 'open', label, detail } für die Übersichten.
export function createCheckStore({ id, createEmpty, sanitize, evaluate, summarize }) {
  return defineStore(id, () => {
    const { answers, saved, replace, reset } = usePersistedAnswers({
      key: `naturgarten-check:${id}:v1`,
      createEmpty,
      sanitize,
    })
    const result = computed(() => evaluate(answers))
    const summary = computed(() => summarize(result.value))
    return { answers, saved, replace, reset, result, summary }
  })
}
