import { describe, expect, it } from 'vitest'
import { exclusionCriteria, mustCriteria } from '../src/modules/vogelgarten/criteria.js'
import { createEmptyState, evaluate, sanitizeState } from '../src/modules/vogelgarten/scoring.js'

function cleanState(mustCount) {
  const state = createEmptyState()
  mustCriteria.forEach((c, index) => {
    state.must[c.id] = index < mustCount
  })
  exclusionCriteria.forEach((c) => {
    state.exclusions[c.id] = false
  })
  return state
}

describe('Vorprüfung Vogelfreundlicher Garten', () => {
  it('hat 4 Muss- und 5 Ausschlusskriterien', () => {
    expect(mustCriteria).toHaveLength(4)
    expect(exclusionCriteria).toHaveLength(5)
  })

  it('ist zu Beginn offen', () => {
    expect(evaluate(createEmptyState()).status).toBe('open')
  })

  it('erlaubt die Anmeldung mit genau 2 Musskriterien', () => {
    expect(evaluate(cleanState(2)).status).toBe('ready')
  })

  it('reicht mit einem Musskriterium nicht', () => {
    expect(evaluate(cleanState(1)).status).toBe('missing')
  })

  it('schließt bei jedem einzelnen Ausschlusskriterium aus', () => {
    for (const criterion of exclusionCriteria) {
      const state = cleanState(4)
      state.exclusions[criterion.id] = true
      expect(evaluate(state).status).toBe('excluded')
    }
  })

  it('schließt sofort aus, auch wenn noch Fragen offen sind', () => {
    const state = createEmptyState()
    state.exclusions.geraete = true
    expect(evaluate(state).status).toBe('excluded')
  })

  it('bleibt offen, solange Ausschlussfragen fehlen', () => {
    const state = cleanState(4)
    state.exclusions.mulch = null
    expect(evaluate(state).status).toBe('open')
  })

  it('erkennt früh, wenn 2 Musskriterien nicht mehr erreichbar sind', () => {
    const state = createEmptyState()
    state.must.insekten = false
    state.must.fruechte = false
    state.must.nistmaterial = false
    expect(evaluate(state).status).toBe('missing')
  })

  it('verwirft ungültige Werte', () => {
    const state = sanitizeState({ must: { insekten: 'ja', fruechte: true, fremd: true } })
    expect(state.must.insekten).toBeNull()
    expect(state.must.fruechte).toBe(true)
    expect(state.must.fremd).toBeUndefined()
  })
})
