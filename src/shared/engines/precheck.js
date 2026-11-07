// Muster „Vorprüfung“: Mindestens `requiredMust` Musskriterien erfüllt und kein
// Ausschlusskriterium. Das Ergebnis sagt nur, ob eine Anmeldung sinnvoll ist.
//
// config = { must: [{ id, title }], requiredMust, exclusions: [{ id, title }] }

export function createPrecheckState(config) {
  return {
    must: Object.fromEntries(config.must.map((c) => [c.id, null])),
    exclusions: Object.fromEntries((config.exclusions ?? []).map((c) => [c.id, null])),
  }
}

export function sanitizePrecheck(config, input) {
  const state = createPrecheckState(config)
  for (const group of ['must', 'exclusions']) {
    for (const id of Object.keys(state[group])) {
      const value = input?.[group]?.[id]
      if (value === true || value === false) state[group][id] = value
    }
  }
  return state
}

// Status: ready, excluded, missing, open.
export function evaluatePrecheck(state, config) {
  const requiredMust = config.requiredMust ?? config.must.length
  const exclusions = config.exclusions ?? []
  const met = config.must.filter((c) => state.must[c.id] === true)
  const openMust = config.must.filter((c) => state.must[c.id] === null)
  const excluded = exclusions.filter((c) => state.exclusions[c.id] === true)
  const openExclusions = exclusions.filter((c) => state.exclusions[c.id] === null)

  let status = 'open'
  if (excluded.length > 0) status = 'excluded'
  else if (met.length + openMust.length < requiredMust) status = 'missing'
  else if (met.length >= requiredMust && openExclusions.length === 0) status = 'ready'

  return { status, met, openMust, excluded, openExclusions, required: requiredMust }
}
