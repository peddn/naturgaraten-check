import { describe, expect, it } from 'vitest'
import { createCountState, evaluateCount, sanitizeCount } from '../src/shared/engines/count.js'
import { createPrecheckState, evaluatePrecheck } from '../src/shared/engines/precheck.js'
import { createTieredState, evaluateTiered, sanitizeTiered } from '../src/shared/engines/tiered.js'

describe('Muster Stufen', () => {
  const config = {
    core: [{ id: 'a' }, { id: 'b' }],
    categories: [
      { id: 'x', required: 3, criteria: [{ id: 'x1' }, { id: 'x2' }] },
      { id: 'y', required: 1, criteria: [{ id: 'y1' }] },
    ],
  }
  const filled = (x1, x2, y1) => {
    const state = createTieredState(config)
    state.core = { a: true, b: true }
    Object.assign(state.ratings, { x1, x2, y1 })
    return state
  }

  it('nutzt eigene Mindestwerte je Kategorie', () => {
    expect(evaluateTiered(filled(2, 1, 1), config).status).toBe('ready')
    expect(evaluateTiered(filled(1, 1, 2), config).status).toBe('missing')
  })

  it('zählt blockierte Kriterien mit 0 Punkten', () => {
    const isBlocked = (_, id) => id === 'x1'
    expect(evaluateTiered(filled(2, 2, 1), config, { isBlocked }).status).toBe('missing')
  })

  it('verwirft ungültige Werte', () => {
    expect(sanitizeTiered(config, { ratings: { x1: 3, y1: 2 } }).ratings).toEqual({ x1: null, x2: null, y1: 2 })
  })
})

describe('Muster Zählen', () => {
  const config = {
    core: [{ id: 'c' }],
    basics: [{ id: 'g' }],
    groups: [{ id: 'g1', criteria: [{ id: 'k1' }, { id: 'k2' }, { id: 'k3' }] }],
    required: 2,
  }
  const answered = (checked) => ({ ...createCountState(config), core: { c: true }, basics: { g: true }, checked })

  it('ist offen, solange Pflichtfragen fehlen', () => {
    expect(evaluateCount(createCountState(config), config).status).toBe('open')
  })

  it('verlangt die Mindestzahl', () => {
    expect(evaluateCount(answered(['k1']), config)).toMatchObject({ status: 'missing', missing: 1 })
    expect(evaluateCount(answered(['k1', 'k3']), config).status).toBe('ready')
  })

  it('scheitert an einem Grundkriterium', () => {
    const state = answered(['k1', 'k2', 'k3'])
    state.basics.g = false
    expect(evaluateCount(state, config).status).toBe('missing')
  })

  it('verwirft unbekannte Kriterien', () => {
    expect(sanitizeCount(config, { checked: ['k2', 'fremd'] }).checked).toEqual(['k2'])
  })
})

describe('Muster Vorprüfung', () => {
  it('verlangt ohne Angabe alle Musskriterien', () => {
    const config = { must: [{ id: 'a' }, { id: 'b' }] }
    const state = createPrecheckState(config)
    state.must = { a: true, b: false }
    expect(evaluatePrecheck(state, config).status).toBe('missing')
    state.must.b = true
    expect(evaluatePrecheck(state, config).status).toBe('ready')
  })
})
