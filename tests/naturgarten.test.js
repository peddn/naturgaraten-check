import { describe, expect, it } from 'vitest'
import { allCoreCriteria, categories } from '../src/modules/naturgarten/criteria.js'
import { createEmptyState, evaluate, scoreCategory, suggestionsFor } from '../src/modules/naturgarten/scoring.js'

const [vielfalt, nutzgarten] = categories

function rate(state, category, ratings) {
  category.criteria.forEach((criterion, index) => {
    state.ratings[criterion.id] = ratings[index]
  })
}

function allCore(state, value = true) {
  allCoreCriteria.forEach((criterion) => {
    state.core[criterion.id] = value
  })
}

function passingState() {
  const state = createEmptyState()
  allCore(state)
  rate(state, vielfalt, [1, 1, 1, 1, 1, 1, 1])
  rate(state, nutzgarten, [1, 1, 1, 1, 1, 1, 1])
  return state
}

describe('Kriterienkatalog', () => {
  it('hat 4 Kernkriterien und je 7 Kann-Kriterien', () => {
    expect(allCoreCriteria).toHaveLength(4)
    expect(vielfalt.criteria).toHaveLength(7)
    expect(nutzgarten.criteria).toHaveLength(7)
  })
})

describe('evaluate', () => {
  it('ist für einen neuen Check offen', () => {
    expect(evaluate(createEmptyState()).status).toBe('open')
  })

  it('erreicht die Plakette mit genau 7 Smileys pro Kategorie', () => {
    expect(evaluate(passingState()).status).toBe('ready')
  })

  it('fehlt mit 6 Smileys in einer Kategorie, wenn alles beantwortet ist', () => {
    const state = passingState()
    state.ratings.blumen = 0
    const result = evaluate(state)
    expect(result.status).toBe('missing')
    expect(result.categories[0]).toMatchObject({ score: 6, missing: 1, met: false })
  })

  it('gleicht eine schwache Kategorie nicht durch eine starke aus', () => {
    const state = passingState()
    rate(state, vielfalt, [2, 2, 2, 2, 2, 2, 2])
    rate(state, nutzgarten, [1, 1, 1, 0, 0, 0, 0])
    expect(evaluate(state).status).toBe('missing')
  })

  it('scheitert an jedem einzelnen Kernkriterium', () => {
    for (const criterion of allCoreCriteria) {
      const state = passingState()
      state.core[criterion.id] = false
      rate(state, vielfalt, [2, 2, 2, 2, 2, 2, 2])
      expect(evaluate(state).status).toBe('missing')
    }
  })

  it('bleibt offen, solange der Gesamteindruck fehlt', () => {
    const state = passingState()
    state.core.gesamteindruck = null
    expect(evaluate(state).status).toBe('open')
  })

  it('braucht nicht alle Kriterien, wenn 7 Smileys erreicht sind', () => {
    const state = createEmptyState()
    allCore(state)
    rate(state, vielfalt, [2, 2, 2, 1, null, null, null])
    rate(state, nutzgarten, [2, 2, 2, 1, null, null, null])
    expect(evaluate(state).status).toBe('ready')
  })

  it('erkennt früh, wenn 7 Smileys nicht mehr erreichbar sind', () => {
    const state = createEmptyState()
    rate(state, vielfalt, [0, 0, 0, 0, null, null, null])
    expect(evaluate(state).status).toBe('missing')
  })

  it('bleibt offen, wenn offene Kriterien die Lücke noch schließen können', () => {
    const state = createEmptyState()
    allCore(state)
    rate(state, vielfalt, [2, 2, 2, 1, null, null, null])
    rate(state, nutzgarten, [1, 1, 1, null, null, null, null])
    expect(evaluate(state).status).toBe('open')
  })
})

describe('Laubsauger und Mähroboter', () => {
  it('nehmen den Nützlingsunterkünften alle Smileys', () => {
    const state = passingState()
    state.ratings.nuetzlinge = 2
    expect(scoreCategory(state, nutzgarten).score).toBe(8)
    state.usesBlowerOrRobot = true
    expect(scoreCategory(state, nutzgarten).score).toBe(6)
    expect(evaluate(state).status).toBe('missing')
  })

  it('zählen ein offenes Nützlingskriterium nicht als erreichbar', () => {
    const state = createEmptyState()
    state.usesBlowerOrRobot = true
    expect(scoreCategory(state, nutzgarten).reachable).toBe(12)
  })

  it('empfehlen zuerst den Verzicht, wenn das die Lücke schließt', () => {
    const state = passingState()
    state.ratings.nuetzlinge = 2
    state.usesBlowerOrRobot = true
    rate(state, nutzgarten, [1, 1, 1, 2, 1, 1, 0])
    const [first] = suggestionsFor(state, nutzgarten)
    expect(first).toMatchObject({ id: 'nuetzlinge', blocked: true, gain: 2 })
  })
})

describe('suggestionsFor', () => {
  it('schlägt nichts vor, wenn die Kategorie erfüllt ist', () => {
    expect(suggestionsFor(passingState(), vielfalt)).toEqual([])
  })

  it('wählt nur so viele Kriterien, wie die Lücke braucht', () => {
    const state = createEmptyState()
    rate(state, vielfalt, [2, 2, 1, 0, 2, 2, 2])
    const items = suggestionsFor(state, vielfalt)
    expect(scoreCategory(state, vielfalt).missing).toBe(0)
    expect(items).toEqual([])

    rate(state, vielfalt, [1, 1, 1, 1, 0, 0, 1])
    const gap = suggestionsFor(state, vielfalt)
    expect(gap.reduce((sum, item) => sum + item.gain, 0)).toBeGreaterThanOrEqual(2)
    expect(gap).toHaveLength(1)
    expect(gap[0].gain).toBe(2)
  })
})
