import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistedAnswers } from '../../shared/usePersistedAnswers.js'
import { createEmptyState, evaluate } from './scoring.js'
import { sanitizeState } from './sanitize.js'

export const useNaturgartenStore = defineStore('naturgarten', () => {
  // Der Schlüssel bleibt, damit bestehende Antworten erhalten bleiben.
  const { answers, saved, replace, reset } = usePersistedAnswers({
    key: 'naturgarten-check:v1',
    createEmpty: createEmptyState,
    sanitize: sanitizeState,
  })

  const result = computed(() => evaluate(answers))

  const summary = computed(() => {
    const [first, second] = result.value.categories
    const label = { ready: 'Kriterien erfüllt', missing: 'Es fehlt noch etwas', open: 'Noch offen' }[result.value.status]
    return { status: result.value.status, label, detail: `${first.score} und ${second.score} Smileys` }
  })

  return { answers, saved, replace, reset, result, summary }
})
