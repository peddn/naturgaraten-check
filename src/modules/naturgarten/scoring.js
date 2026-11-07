import {
  createTieredState,
  effectiveRating as tieredRating,
  evaluateTiered,
  scoreCategory as tieredScore,
  suggestionsFor as tieredSuggestions,
} from '../../shared/engines/tiered.js'
import { BLOWER_CONDITION_CRITERION, allCoreCriteria, categories } from './criteria.js'

// Bewertung nach dem Muster „Stufen“, ergänzt um die Laubsauger-Regel.
export const config = { core: allCoreCriteria, categories }

export function isBlocked(state, criterionId) {
  return criterionId === BLOWER_CONDITION_CRITERION && state.usesBlowerOrRobot
}

const options = { isBlocked }

export function createEmptyState() {
  return { gardenName: '', notes: '', usesBlowerOrRobot: false, ...createTieredState(config) }
}

export const effectiveRating = (state, id) => tieredRating(state, id, options)
export const scoreCategory = (state, category) => tieredScore(state, category, options)
export const suggestionsFor = (state, category) => tieredSuggestions(state, category, options)
export const evaluate = (state) => evaluateTiered(state, config, options)
