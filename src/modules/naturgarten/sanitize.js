import { createEmptyState } from './scoring.js'

const MAX_TEXT_LENGTH = 5000

// Übernimmt nur bekannte Felder und gültige Werte.
export function sanitizeState(input) {
  const state = createEmptyState()
  if (!input || typeof input !== 'object') return state

  if (typeof input.gardenName === 'string') state.gardenName = input.gardenName.slice(0, 120)
  if (typeof input.notes === 'string') state.notes = input.notes.slice(0, MAX_TEXT_LENGTH)
  state.usesBlowerOrRobot = input.usesBlowerOrRobot === true

  for (const id of Object.keys(state.core)) {
    const value = input.core?.[id]
    if (value === true || value === false) state.core[id] = value
  }
  for (const id of Object.keys(state.ratings)) {
    const value = input.ratings?.[id]
    if (value === 0 || value === 1 || value === 2) state.ratings[id] = value
  }
  return state
}
