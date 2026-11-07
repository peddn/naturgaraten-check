import { createPrecheckState, evaluatePrecheck, sanitizePrecheck } from '../../shared/engines/precheck.js'
import { REQUIRED_MUST, exclusionCriteria, mustCriteria } from './criteria.js'

// Bewertung nach dem Muster „Vorprüfung“.
const config = { must: mustCriteria, requiredMust: REQUIRED_MUST, exclusions: exclusionCriteria }

export const createEmptyState = () => createPrecheckState(config)
export const sanitizeState = (input) => sanitizePrecheck(config, input)
export const evaluate = (state) => evaluatePrecheck(state, config)
