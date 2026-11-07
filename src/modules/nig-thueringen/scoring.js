import { createPrecheckState, evaluatePrecheck, sanitizePrecheck } from '../../shared/engines/precheck.js'
import { config, groups } from './criteria.js'

// Muster „Vorprüfung“: Alle Kernkriterien müssen erfüllt sein. Die Elemente werden
// nur erfasst, weil der Flyer keine Mindestzahl nennt.
const known = groups.flatMap((g) => g.criteria.map((c) => c.id))

export const createEmptyState = () => ({ ...createPrecheckState(config), present: [] })

export function sanitizeState(input) {
  const state = { ...sanitizePrecheck(config, input), present: [] }
  if (Array.isArray(input?.present)) state.present = known.filter((id) => input.present.includes(id))
  return state
}

export function evaluate(state) {
  const precheck = evaluatePrecheck(state, config)
  const counts = groups.map((g) => ({
    id: g.id,
    title: g.title,
    count: g.criteria.filter((c) => state.present.includes(c.id)).length,
    total: g.criteria.length,
  }))
  return { ...precheck, counts }
}

export function summarize(result) {
  const labels = { ready: 'Kernkriterien erfüllt', missing: 'Kernkriterium fehlt', open: 'Noch offen' }
  const [a, b] = result.counts
  return {
    status: result.status,
    label: labels[result.status],
    detail: `${a.count} von ${a.total} Elementen und ${b.count} von ${b.total} Bewirtschaftungspunkten`,
  }
}
