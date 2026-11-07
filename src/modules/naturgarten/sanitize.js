import { sanitizeTiered } from '../../shared/engines/tiered.js'
import { config, createEmptyState } from './scoring.js'

const MAX_TEXT_LENGTH = 5000

// Übernimmt nur bekannte Felder und gültige Werte.
export function sanitizeState(input) {
  const state = sanitizeTiered(config, input, createEmptyState())
  if (!input || typeof input !== 'object') return state

  if (typeof input.gardenName === 'string') state.gardenName = input.gardenName.slice(0, 120)
  if (typeof input.notes === 'string') state.notes = input.notes.slice(0, MAX_TEXT_LENGTH)
  state.usesBlowerOrRobot = input.usesBlowerOrRobot === true
  return state
}
