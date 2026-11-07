import { describe, expect, it } from 'vitest'
import { categories, core } from '../src/modules/nig-bw/criteria.js'
import { createEmptyState, evaluate, sanitizeState } from '../src/modules/nig-bw/scoring.js'

const [elemente, bewirtschaftung] = categories

function rate(state, category, values) {
  category.criteria.forEach((c, i) => {
    state.ratings[c.id] = values[i]
  })
}

function passing() {
  const state = createEmptyState()
  core.forEach((c) => {
    state.core[c.id] = true
  })
  rate(state, elemente, [1, 1, 1, 1, 1, 1, 1, 0])
  rate(state, bewirtschaftung, [1, 1, 1, 1, 1, 0, 0, 0])
  return state
}

describe('Natur im Garten Baden-Württemberg', () => {
  it('hat 3 Kernkriterien und je 8 weitere Kriterien', () => {
    expect(core).toHaveLength(3)
    expect(elemente.criteria).toHaveLength(8)
    expect(bewirtschaftung.criteria).toHaveLength(8)
  })

  it('verlangt 7 Sterne bei den Elementen und 5 bei der Bewirtschaftung', () => {
    expect(evaluate(passing()).status).toBe('ready')
    const fewElements = passing()
    fewElements.ratings.blumen = 0
    expect(evaluate(fewElements).status).toBe('missing')
    const fewManagement = passing()
    fewManagement.ratings.kompost = 0
    expect(evaluate(fewManagement).status).toBe('missing')
  })

  it('scheitert an jedem Kernkriterium', () => {
    for (const c of core) {
      const state = passing()
      state.core[c.id] = false
      expect(evaluate(state).status).toBe('missing')
    }
  })

  it('wertet Bäume auf Kleingartenparzellen nicht', () => {
    const state = passing()
    rate(state, elemente, [1, 1, 1, 1, 1, 2, 0, 0])
    expect(evaluate(state).status).toBe('ready')
    state.kleingarten = true
    expect(evaluate(state).status).toBe('missing')
  })

  it('übernimmt nur gültige Werte', () => {
    const state = sanitizeState({ kleingarten: 'ja', ratings: { blumen: 2, fremd: 1 } })
    expect(state.kleingarten).toBe(false)
    expect(state.ratings.blumen).toBe(2)
    expect(state.ratings.fremd).toBeUndefined()
  })
})
