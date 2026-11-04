import {
  BLOWER_CONDITION_CRITERION,
  REQUIRED_SMILEYS,
  allCoreCriteria,
  categories,
} from './criteria.js'

export function createEmptyState() {
  return {
    gardenName: '',
    notes: '',
    usesBlowerOrRobot: false,
    core: Object.fromEntries(allCoreCriteria.map((c) => [c.id, null])),
    ratings: Object.fromEntries(categories.flatMap((cat) => cat.criteria.map((c) => [c.id, null]))),
  }
}

export function isBlocked(state, criterionId) {
  return criterionId === BLOWER_CONDITION_CRITERION && state.usesBlowerOrRobot
}

// Laubsauger oder Mähroboter machen das Kriterium Nützlingsunterkünfte wertlos.
export function effectiveRating(state, criterionId) {
  const rating = state.ratings[criterionId]
  if (rating === null || rating === undefined) return null
  return isBlocked(state, criterionId) ? 0 : rating
}

export function scoreCategory(state, category) {
  let score = 0
  let reachable = 0
  let answered = 0
  for (const criterion of category.criteria) {
    const rating = effectiveRating(state, criterion.id)
    if (rating !== null) answered += 1
    score += rating ?? 0
    // Offene Kriterien können noch 2 Smileys bringen, blockierte keinen.
    reachable += rating ?? (isBlocked(state, criterion.id) ? 0 : 2)
  }
  return {
    id: category.id,
    title: category.title,
    score,
    reachable,
    answered,
    total: category.criteria.length,
    required: REQUIRED_SMILEYS,
    missing: Math.max(0, REQUIRED_SMILEYS - score),
    met: score >= REQUIRED_SMILEYS,
  }
}

// Vorschläge, die die Lücke mit möglichst wenigen Kriterien schließen.
export function suggestionsFor(state, category) {
  const { missing } = scoreCategory(state, category)
  if (missing === 0) return []

  const candidates = category.criteria
    .map((criterion) => ({
      id: criterion.id,
      title: criterion.title,
      blocked: isBlocked(state, criterion.id),
      tip: isBlocked(state, criterion.id) ? criterion.blockedTip : criterion.tip,
      gain: 2 - (effectiveRating(state, criterion.id) ?? 0),
    }))
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

export function evaluate(state) {
  const core = allCoreCriteria.map((criterion) => ({
    id: criterion.id,
    title: criterion.title,
    value: state.core[criterion.id] ?? null,
  }))
  const coreFailed = core.filter((c) => c.value === false)
  const coreOpen = core.filter((c) => c.value === null)
  const categoryScores = categories.map((category) => scoreCategory(state, category))
  const unreachable = categoryScores.filter((c) => c.reachable < REQUIRED_SMILEYS)

  let status = 'open'
  if (coreFailed.length > 0 || unreachable.length > 0) {
    status = 'missing'
  } else if (coreOpen.length === 0 && categoryScores.every((c) => c.met)) {
    status = 'ready'
  } else if (
    coreOpen.length === 0 &&
    categoryScores.every((c) => c.met || c.answered === c.total)
  ) {
    status = 'missing'
  }

  return {
    status,
    core,
    coreFailed,
    coreOpen,
    categories: categoryScores,
    suggestions: categories.map((category) => ({
      id: category.id,
      title: category.title,
      items: suggestionsFor(state, category),
    })),
  }
}
