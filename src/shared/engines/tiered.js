// Muster „Stufen“: Kernkriterien müssen alle erfüllt sein, dazu Kategorien mit
// Kriterien, die 0, 1 (teilweise) oder 2 Punkte (voll) bringen. Jede Kategorie hat
// eine eigene Mindestpunktzahl, Kategorien gleichen sich nicht aus.
//
// config = { core: [{ id, title }], categories: [{ id, title, required, criteria: [{ id, title, tip?, blockedTip? }] }] }
// options.isBlocked(state, criterionId): blockierte Kriterien zählen 0 Punkte.

const noBlock = () => false

export function createTieredState(config) {
  return {
    core: Object.fromEntries(config.core.map((c) => [c.id, null])),
    ratings: Object.fromEntries(config.categories.flatMap((cat) => cat.criteria.map((c) => [c.id, null]))),
  }
}

export function sanitizeTiered(config, input, state = createTieredState(config)) {
  if (!input || typeof input !== 'object') return state
  for (const id of Object.keys(state.core)) {
    const value = input.core?.[id]
    if (value === true || value === false) state.core[id] = value
  }
  for (const id of Object.keys(state.ratings)) {
    const value = input.ratings?.[id]
    if (value === 0 || value === 1 || value === 2) state.ratings[id] = value
  }
  return state
}

export function effectiveRating(state, criterionId, { isBlocked = noBlock } = {}) {
  const rating = state.ratings[criterionId]
  if (rating === null || rating === undefined) return null
  return isBlocked(state, criterionId) ? 0 : rating
}

export function scoreCategory(state, category, options = {}) {
  const { isBlocked = noBlock } = options
  let score = 0
  let reachable = 0
  let answered = 0
  for (const criterion of category.criteria) {
    const rating = effectiveRating(state, criterion.id, options)
    if (rating !== null) answered += 1
    score += rating ?? 0
    // Offene Kriterien können noch 2 Punkte bringen, blockierte keinen.
    reachable += rating ?? (isBlocked(state, criterion.id) ? 0 : 2)
  }
  return {
    id: category.id,
    title: category.title,
    score,
    reachable,
    answered,
    total: category.criteria.length,
    max: category.criteria.length * 2,
    required: category.required,
    missing: Math.max(0, category.required - score),
    met: score >= category.required,
  }
}

// Vorschläge, die die Lücke mit möglichst wenigen Kriterien schließen.
export function suggestionsFor(state, category, options = {}) {
  const { isBlocked = noBlock } = options
  const { missing } = scoreCategory(state, category, options)
  if (missing === 0) return []

  const candidates = category.criteria
    .map((criterion) => {
      const blocked = isBlocked(state, criterion.id)
      return {
        id: criterion.id,
        title: criterion.title,
        blocked,
        tip: blocked ? criterion.blockedTip : criterion.tip,
        gain: 2 - (effectiveRating(state, criterion.id, options) ?? 0),
      }
    })
    .filter((candidate) => candidate.gain > 0)
    .sort((a, b) => b.gain - a.gain)

  const picked = []
  let covered = 0
  for (const candidate of candidates) {
    if (covered >= missing) break
    picked.push(candidate)
    covered += candidate.gain
  }
  return picked
}

// Status: ready (alles erfüllt), missing (nicht mehr erreichbar oder fertig und zu wenig), open.
export function evaluateTiered(state, config, options = {}) {
  const core = config.core.map((criterion) => ({
    id: criterion.id,
    title: criterion.title,
    value: state.core[criterion.id] ?? null,
  }))
  const coreFailed = core.filter((c) => c.value === false)
  const coreOpen = core.filter((c) => c.value === null)
  const categoryScores = config.categories.map((category) => scoreCategory(state, category, options))
  const unreachable = categoryScores.filter((c) => c.reachable < c.required)

  let status = 'open'
  if (coreFailed.length > 0 || unreachable.length > 0) {
    status = 'missing'
  } else if (coreOpen.length === 0 && categoryScores.every((c) => c.met)) {
    status = 'ready'
  } else if (coreOpen.length === 0 && categoryScores.every((c) => c.met || c.answered === c.total)) {
    status = 'missing'
  }

  return {
    status,
    core,
    coreFailed,
    coreOpen,
    categories: categoryScores,
    suggestions: config.categories.map((category) => ({
      id: category.id,
      title: category.title,
      items: suggestionsFor(state, category, options),
    })),
  }
}
