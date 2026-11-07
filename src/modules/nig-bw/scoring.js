import {
  createTieredState,
  effectiveRating as tieredRating,
  evaluateTiered,
  sanitizeTiered,
} from '../../shared/engines/tiered.js'
import { ALLOTMENT_BLOCKED, config } from './criteria.js'

// Auf Kleingartenparzellen ist das Kriterium „Standortgerechte Bäume“ nicht anwendbar.
export const isBlocked = (state, id) => state.kleingarten && id === ALLOTMENT_BLOCKED
export const options = { isBlocked }

export const createEmptyState = () => ({ kleingarten: false, ...createTieredState(config) })

export function sanitizeState(input) {
  const state = sanitizeTiered(config, input, createEmptyState())
  state.kleingarten = input?.kleingarten === true
  return state
}

export const effectiveRating = (state, id) => tieredRating(state, id, options)
export const evaluate = (state) => evaluateTiered(state, config, options)

export function summarize(result) {
  const labels = { ready: 'Kriterien erfüllt', missing: 'Es fehlt noch etwas', open: 'Noch offen' }
  const [a, b] = result.categories
  return { status: result.status, label: labels[result.status], detail: `${a.score} und ${b.score} Sterne` }
}
