import { describe, expect, it } from 'vitest'
import { countCriteria, strictCriteria } from '../src/modules/praemierung/criteria.js'
import { createEmptyState, evaluate, sanitizeState } from '../src/modules/praemierung/scoring.js'

function bronzeState() {
  const state = createEmptyState()
  strictCriteria.forEach((c) => {
    state.strict[c.id] = true
  })
  countCriteria.forEach((c) => {
    state.counts[c.id] = 0
  })
  state.biotopes = ['totholz', 'teich']
  return state
}

describe('Naturgartenprämierung', () => {
  it('ist zu Beginn offen', () => {
    expect(evaluate(createEmptyState()).status).toBe('open')
  })

  it('erreicht Bronze, wenn alle Mindestkriterien erfüllt sind', () => {
    expect(evaluate(bronzeState()).status).toBe('bronze')
  })

  it('scheitert an jedem strengen Kriterium, auch für die Grüne Oase', () => {
    for (const criterion of strictCriteria) {
      const state = bronzeState()
      state.strict[criterion.id] = false
      state.counts.neophytes = 1
      expect(evaluate(state).status).toBe('missing')
    }
  })

  it('braucht 2 Biotopelemente', () => {
    const state = bronzeState()
    state.biotopes = ['teich']
    expect(evaluate(state).status).toBe('missing')
  })

  it.each([
    ['neophytes', 1],
    ['neophytes', 2],
    ['overseas', 1],
    ['treatedWood', 1],
  ])('macht aus %s = %i die Grüne Oase', (id, value) => {
    const state = bronzeState()
    state.counts[id] = value
    expect(evaluate(state).status).toBe('oasis')
  })

  it.each([
    ['neophytes', 3],
    ['overseas', 2],
    ['treatedWood', 2],
  ])('lässt %s = %i nicht mehr als Ausnahme zu', (id, value) => {
    const state = bronzeState()
    state.counts[id] = value
    expect(evaluate(state).status).toBe('missing')
  })

  it('nennt mehrere Ausnahmen zugleich unklar', () => {
    const state = bronzeState()
    state.counts.neophytes = 1
    state.counts.overseas = 1
    expect(evaluate(state).status).toBe('unclear')
  })

  it('verwirft ungültige Werte', () => {
    const state = sanitizeState({
      strict: { native: 'ja', noPeat: true },
      counts: { overseas: 3, neophytes: 3 },
      biotopes: ['teich', 'fremd'],
    })
    expect(state.strict.native).toBeNull()
    expect(state.strict.noPeat).toBe(true)
    expect(state.counts.overseas).toBeNull()
    expect(state.counts.neophytes).toBe(3)
    expect(state.biotopes).toEqual(['teich'])
  })
})
