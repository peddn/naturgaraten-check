// Muster „Zählen“: Kernkriterien und Grundkriterien müssen alle erfüllt sein,
// dazu mindestens `required` weitere Kriterien aus beliebigen Gruppen.
//
// config = { core: [{ id, title }], basics: [{ id, title }], groups: [{ id, title, criteria: [{ id, title }] }], required }

export function createCountState(config) {
  return {
    core: Object.fromEntries(config.core.map((c) => [c.id, null])),
    basics: Object.fromEntries(config.basics.map((c) => [c.id, null])),
    checked: [],
  }
}

export function sanitizeCount(config, input) {
  const state = createCountState(config)
  if (!input || typeof input !== 'object') return state
  for (const group of ['core', 'basics']) {
    for (const id of Object.keys(state[group])) {
      const value = input[group]?.[id]
      if (value === true || value === false) state[group][id] = value
    }
  }
  const known = config.groups.flatMap((g) => g.criteria.map((c) => c.id))
  if (Array.isArray(input.checked)) state.checked = known.filter((id) => input.checked.includes(id))
  return state
}

// Status: ready, missing (Pflicht verfehlt oder zu wenige Kriterien), open (Pflicht unbeantwortet).
export function evaluateCount(state, config) {
  const required = [
    ...config.core.map((c) => ({ id: c.id, title: c.title, value: state.core[c.id] ?? null })),
    ...config.basics.map((c) => ({ id: c.id, title: c.title, value: state.basics[c.id] ?? null })),
  ]
  const failed = required.filter((c) => c.value === false)
  const open = required.filter((c) => c.value === null)
  const count = state.checked.length
  const missing = Math.max(0, config.required - count)
  const groups = config.groups.map((group) => ({
    id: group.id,
    title: group.title,
    count: group.criteria.filter((c) => state.checked.includes(c.id)).length,
    total: group.criteria.length,
  }))

  let status = 'open'
  if (failed.length > 0) status = 'missing'
  else if (open.length === 0) status = missing === 0 ? 'ready' : 'missing'

  return { status, required: config.required, failed, open, count, missing, groups }
}
