import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistedAnswers } from '../../shared/usePersistedAnswers.js'
import { createEmptyState, evaluate, sanitizeState } from './scoring.js'

export const useVogelgartenStore = defineStore('vogelgarten', () => {
  const { answers, saved, replace, reset } = usePersistedAnswers({
    key: 'naturgarten-check:vogelgarten:v1',
    createEmpty: createEmptyState,
    sanitize: sanitizeState,
  })

  const result = computed(() => evaluate(answers))

  const summary = computed(() => {
    const labels = {
      ready: 'Anmeldung möglich',
      excluded: 'Ausschlusskriterium',
      missing: 'Es fehlt noch etwas',
      open: 'Noch offen',
    }
    return {
      status: result.value.status === 'excluded' ? 'missing' : result.value.status,
      label: labels[result.value.status],
      detail: `${result.value.met.length} von mindestens ${result.value.required} Musskriterien`,
    }
  })

  return { answers, saved, replace, reset, result, summary }
})
