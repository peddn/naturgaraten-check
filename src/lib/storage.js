import { createEmptyState } from './scoring.js'

const STORAGE_KEY = 'naturgarten-check:v1'
const APP_ID = 'naturgarten-check'
const FORMAT_VERSION = 1
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

export function loadState(storage = globalThis.localStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    return raw ? sanitizeState(JSON.parse(raw)) : createEmptyState()
  } catch {
    return createEmptyState()
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function serializeExport(state, now = new Date()) {
  return JSON.stringify(
    { app: APP_ID, version: FORMAT_VERSION, exportedAt: now.toISOString(), garden: state },
    null,
    2,
  )
}

export function parseImport(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Die Datei enthält kein gültiges JSON. Wähle eine exportierte Datei aus.')
  }
  if (data?.app !== APP_ID || !data.garden) {
    throw new Error('Diese Datei stammt nicht aus dem Naturgarten-Check. Wähle eine exportierte Datei aus.')
  }
  if (data.version !== FORMAT_VERSION) {
    throw new Error(`Das Dateiformat ${data.version} wird nicht unterstützt.`)
  }
  return sanitizeState(data.garden)
}

export function exportFileName(state) {
  const slug = state.gardenName
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `naturgarten-check${slug ? `-${slug}` : ''}.json`
}
