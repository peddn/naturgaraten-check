import { describe, expect, it } from 'vitest'
import { modules } from '../src/modules/index.js'
import { NATIONWIDE, modulesForState, stateBySlug, states } from '../src/shared/regions.js'

describe('Bundesländer', () => {
  it('kennt alle 16 Länder mit eindeutigen Kürzeln und Adressen', () => {
    expect(states).toHaveLength(16)
    expect(new Set(states.map((s) => s.code)).size).toBe(16)
    expect(new Set(states.map((s) => s.slug)).size).toBe(16)
    expect(stateBySlug('thueringen').name).toBe('Thüringen')
    expect(stateBySlug('atlantis')).toBeNull()
  })

  it('ordnet jedem Modul gültige Gebiete zu', () => {
    const codes = [NATIONWIDE, ...states.map((s) => s.code)]
    for (const module of modules) {
      expect(module.regions.length).toBeGreaterThan(0)
      for (const region of module.regions) expect(codes).toContain(region)
    }
  })

  it('zeigt Bayern eigene und bundesweite Angebote', () => {
    const { regional, nationwide } = modulesForState(modules, 'BY')
    expect(regional.map((m) => m.id)).toEqual(['naturgarten', 'vogelgarten'])
    expect(nationwide.map((m) => m.id)).toEqual(['praemierung'])
  })

  it('zeigt Bremen nur bundesweite Angebote', () => {
    expect(modulesForState(modules, 'HB').regional).toEqual([])
  })
})
