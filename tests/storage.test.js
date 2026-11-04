import { describe, expect, it } from 'vitest'
import { createEmptyState } from '../src/lib/scoring.js'
import {
  exportFileName,
  loadState,
  parseImport,
  sanitizeState,
  saveState,
  serializeExport,
} from '../src/lib/storage.js'

function memoryStorage() {
  const data = new Map()
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) }
}

describe('Browser-Speicher', () => {
  it('stellt gespeicherte Antworten wieder her', () => {
    const storage = memoryStorage()
    const state = createEmptyState()
    state.ratings.blumen = 2
    state.core.torf = false
    expect(saveState(state, storage)).toBe(true)
    expect(loadState(storage)).toEqual(state)
  })

  it('startet leer, wenn der Speicher fehlt oder wirft', () => {
    const broken = {
      getItem() {
        throw new Error('blocked')
      },
      setItem() {
        throw new Error('blocked')
      },
    }
    expect(loadState(broken)).toEqual(createEmptyState())
    expect(saveState(createEmptyState(), broken)).toBe(false)
  })

  it('startet leer bei beschädigten Daten', () => {
    const storage = { getItem: () => '{kaputt', setItem() {} }
    expect(loadState(storage)).toEqual(createEmptyState())
  })
})

describe('JSON-Export und -Import', () => {
  it('überlebt einen kompletten Durchlauf', () => {
    const state = createEmptyState()
    state.gardenName = 'Bienenwiese'
    state.notes = 'Teich anlegen'
    state.usesBlowerOrRobot = true
    state.ratings.regen = 1
    state.core.duenger = true
    expect(parseImport(serializeExport(state))).toEqual(state)
  })

  it('lehnt ungültiges JSON ab', () => {
    expect(() => parseImport('nope')).toThrow('kein gültiges JSON')
  })

  it('lehnt fremde Dateien ab', () => {
    expect(() => parseImport('{"foo":1}')).toThrow('nicht aus dem Naturgarten-Check')
  })

  it('lehnt unbekannte Formatversionen ab', () => {
    const text = JSON.stringify({ app: 'naturgarten-check', version: 99, garden: {} })
    expect(() => parseImport(text)).toThrow('99')
  })

  it('verwirft unbekannte Felder und ungültige Werte', () => {
    const state = sanitizeState({
      hacked: true,
      core: { torf: 'ja', duenger: true, fremd: true },
      ratings: { blumen: 5, hecke: 1, fremd: 2 },
    })
    expect(state.hacked).toBeUndefined()
    expect(state.core.torf).toBeNull()
    expect(state.core.duenger).toBe(true)
    expect(state.core.fremd).toBeUndefined()
    expect(state.ratings.blumen).toBeNull()
    expect(state.ratings.hecke).toBe(1)
    expect(state.ratings.fremd).toBeUndefined()
  })

  it('baut lesbare Dateinamen', () => {
    expect(exportFileName({ gardenName: 'Süße Äpfel & Co.' })).toBe(
      'naturgarten-check-suesse-aepfel-co.json',
    )
    expect(exportFileName({ gardenName: '' })).toBe('naturgarten-check.json')
  })
})
