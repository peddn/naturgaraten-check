import { describe, expect, it } from 'vitest'
import { sanitizeState } from '../src/modules/naturgarten/sanitize.js'
import { createEmptyState } from '../src/modules/naturgarten/scoring.js'
import {
  exportFileName,
  loadAnswers,
  parseImport,
  saveAnswers,
  serializeExport,
} from '../src/shared/storage.js'

function memoryStorage() {
  const data = new Map()
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) }
}

const load = (storage) => loadAnswers('key', createEmptyState, sanitizeState, storage)

describe('Browser-Speicher', () => {
  it('stellt gespeicherte Antworten wieder her', () => {
    const storage = memoryStorage()
    const state = createEmptyState()
    state.ratings.blumen = 2
    state.core.torf = false
    expect(saveAnswers('key', state, storage)).toBe(true)
    expect(load(storage)).toEqual(state)
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
    expect(load(broken)).toEqual(createEmptyState())
    expect(saveAnswers('key', createEmptyState(), broken)).toBe(false)
  })

  it('startet leer bei beschädigten Daten', () => {
    expect(load({ getItem: () => '{kaputt', setItem() {} })).toEqual(createEmptyState())
  })
})

describe('JSON-Export und -Import', () => {
  it('überlebt einen Durchlauf mit mehreren Modulen', () => {
    const modules = { naturgarten: { gardenName: 'Bienenwiese' }, vogelgarten: { must: { insekten: true } } }
    expect(parseImport(serializeExport(modules))).toEqual(modules)
  })

  it('liest Dateien aus der ersten Version', () => {
    const text = JSON.stringify({ app: 'naturgarten-check', version: 1, garden: { gardenName: 'Alt' } })
    expect(parseImport(text)).toEqual({ naturgarten: { gardenName: 'Alt' } })
  })

  it('lehnt ungültiges JSON ab', () => {
    expect(() => parseImport('nope')).toThrow('kein gültiges JSON')
  })

  it('lehnt fremde Dateien ab', () => {
    expect(() => parseImport('{"foo":1}')).toThrow('nicht aus dem Garten-Check')
  })

  it('lehnt unbekannte Formatversionen ab', () => {
    const text = JSON.stringify({ app: 'naturgarten-check', version: 99, modules: {} })
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
    expect(exportFileName('Süße Äpfel & Co.')).toBe('garten-check-suesse-aepfel-co.json')
    expect(exportFileName('')).toBe('garten-check.json')
  })
})
