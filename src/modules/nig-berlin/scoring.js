import { createCountState, evaluateCount, sanitizeCount } from '../../shared/engines/count.js'
import { config } from './criteria.js'

// Bewertung nach dem Muster „Zählen“.
export const createEmptyState = () => createCountState(config)
export const sanitizeState = (input) => sanitizeCount(config, input)
export const evaluate = (state) => evaluateCount(state, config)

export function summarize(result) {
  const labels = { ready: 'Kriterien erfüllt', missing: 'Es fehlt noch etwas', open: 'Noch offen' }
  return {
    status: result.status,
    label: labels[result.status],
    detail: `${result.count} von mindestens ${result.required} weiteren Kriterien`,
  }
}
