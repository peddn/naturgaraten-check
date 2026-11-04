import { defineStore } from 'pinia'
import { computed } from 'vue'
import { usePersistedAnswers } from '../../shared/usePersistedAnswers.js'
import { createEmptyState, evaluate, sanitizeState } from './scoring.js'

export const usePraemierungStore = defineStore('praemierung', () => {
  const { answers, saved, replace, reset } = usePersistedAnswers({
    key: 'naturgarten-check:praemierung:v1',
    createEmpty: createEmptyState,
    sanitize: sanitizeState,
  })

  const result = computed(() => evaluate(answers))

  const summary = computed(() => {
    const labels = {
      bronze: 'Mindestens Bronze möglich',
      oasis: 'Grüne Oase möglich',
      unclear: 'Beim Verein nachfragen',
      missing: 'Es fehlt noch etwas',
      open: 'Noch offen',
    }
    const { status, biotopeCount } = result.value
    return {
      status: status === 'bronze' || status === 'oasis' ? 'ready' : status === 'unclear' ? 'open' : status,
      label: labels[status],
      detail: `${biotopeCount} Biotopelemente`,
    }
  })

  return { answers, saved, replace, reset, result, summary }
})
