import { describe, expect, it } from 'vitest'
import { core, groups } from '../src/modules/nig-thueringen/criteria.js'
import { createEmptyState, evaluate, sanitizeState } from '../src/modules/nig-thueringen/scoring.js'

describe('Natur im Garten Thüringen', () => {
  it('hat 3 Kernkriterien, 8 Elemente und 9 Bewirtschaftungspunkte', () => {
    expect(core).toHaveLength(3)
    expect(groups.map((g) => g.criteria.length)).toEqual([8, 9])
  })

  it('verlangt alle Kernkriterien und keine Mindestzahl an Elementen', () => {
    const state = createEmptyState()
    state.must = { pestizide: true, duenger: true, torf: true }
    expect(evaluate(state).status).toBe('ready')
    state.must.torf = false
    expect(evaluate(state).status).toBe('missing')
  })

  it('zählt die angekreuzten Elemente je Bereich', () => {
    const state = createEmptyState()
    state.present = ['wiese', 'blumen', 'kompost']
    expect(evaluate(state).counts.map((c) => c.count)).toEqual([2, 1])
  })

  it('verwirft unbekannte Elemente', () => {
    expect(sanitizeState({ present: ['wiese', 'fremd'] }).present).toEqual(['wiese'])
  })
})
