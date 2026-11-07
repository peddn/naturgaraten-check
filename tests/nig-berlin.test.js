import { describe, expect, it } from 'vitest'
import { basics, core, groups } from '../src/modules/nig-berlin/criteria.js'
import { createEmptyState, evaluate } from '../src/modules/nig-berlin/scoring.js'

const all = groups.flatMap((g) => g.criteria.map((c) => c.id))

function answered(count) {
  const state = createEmptyState()
  ;[...core, ...basics].forEach((c) => {
    state[core.includes(c) ? 'core' : 'basics'][c.id] = true
  })
  state.checked = all.slice(0, count)
  return state
}

describe('Natur im Garten Berlin', () => {
  it('hat 3 Kern-, 2 Grund- und 23 weitere Kriterien', () => {
    expect(core).toHaveLength(3)
    expect(basics).toHaveLength(2)
    expect(groups.map((g) => g.criteria.length)).toEqual([8, 9, 6])
    expect(new Set(all).size).toBe(23)
  })

  it('verlangt mindestens 7 weitere Kriterien', () => {
    expect(evaluate(answered(6))).toMatchObject({ status: 'missing', missing: 1 })
    expect(evaluate(answered(7)).status).toBe('ready')
  })

  it('zählt Kriterien aus allen Bereichen zusammen', () => {
    const state = answered(0)
    state.checked = ['wiese', 'kompost', 'dach', 'fassade', 'streusalz', 'wildesEck', 'regenwasser']
    expect(evaluate(state).status).toBe('ready')
  })

  it('scheitert an jedem Kern- und Grundkriterium', () => {
    for (const c of core) {
      const state = answered(23)
      state.core[c.id] = false
      expect(evaluate(state).status).toBe('missing')
    }
    for (const c of basics) {
      const state = answered(23)
      state.basics[c.id] = false
      expect(evaluate(state).status).toBe('missing')
    }
  })
})
