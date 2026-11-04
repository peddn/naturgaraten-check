import { REQUIRED_MUST, exclusionCriteria, mustCriteria } from './criteria.js'

export function createEmptyState() {
  return {
    must: Object.fromEntries(mustCriteria.map((c) => [c.id, null])),
    exclusions: Object.fromEntries(exclusionCriteria.map((c) => [c.id, null])),
  }
}

export function sanitizeState(input) {
  const state = createEmptyState()
  for (const group of ['must', 'exclusions']) {
    for (const id of Object.keys(state[group])) {
      const value = input?.[group]?.[id]
      if (value === true || value === false) state[group][id] = value
    }
  }
  return state
}

export function evaluate(state) {
  const met = mustCriteria.filter((c) => state.must[c.id] === true)
  const openMust = mustCriteria.filter((c) => state.must[c.id] === null)
  const excluded = exclusionCriteria.filter((c) => state.exclusions[c.id] === true)
  const openExclusions = exclusionCriteria.filter((c) => state.exclusions[c.id] === null)

  let status = 'open'
  if (excluded.length > 0) status = 'excluded'
  else if (met.length + openMust.length < REQUIRED_MUST) status = 'missing'
  else if (met.length >= REQUIRED_MUST && openExclusions.length === 0) status = 'ready'

  return { status, met, openMust, excluded, openExclusions, required: REQUIRED_MUST }
}
