import { REQUIRED_BIOTOPES, biotopes, countCriteria, nativeCriterion, strictCriteria } from './criteria.js'

export function createEmptyState() {
  return {
    native: null,
    strict: Object.fromEntries(strictCriteria.map((c) => [c.id, null])),
    counts: Object.fromEntries(countCriteria.map((c) => [c.id, null])),
    biotopes: [],
  }
}

export function sanitizeState(input) {
  const state = createEmptyState()
  // Frühere Versionen speicherten die Antwort als Ja oder Nein.
  const native = input?.native ?? input?.strict?.native
  const legacy = { true: 'wild', false: 'none' }[native]
  if (nativeCriterion.options.some((option) => option.value === (legacy ?? native))) {
    state.native = legacy ?? native
  }
  for (const criterion of strictCriteria) {
    const value = input?.strict?.[criterion.id]
    if (value === true || value === false) state.strict[criterion.id] = value
  }
  for (const criterion of countCriteria) {
    const value = input?.counts?.[criterion.id]
    if (criterion.options.some((option) => option.value === value)) state.counts[criterion.id] = value
  }
  const known = biotopes.map((b) => b.id)
  if (Array.isArray(input?.biotopes)) {
    state.biotopes = known.filter((id) => input.biotopes.includes(id))
  }
  return state
}

function countState(criterion, value) {
  if (value === null) return 'open'
  if (value === 0) return 'ok'
  return value <= criterion.limit ? 'exception' : 'fail'
}

function nativeState(value) {
  if (value === null) return 'open'
  if (value === 'wild') return 'ok'
  return value === 'native' ? 'oasisOnly' : 'fail'
}

// Mögliche Stufen: bronze, oasis, missing, open.
// Oase gilt nur als möglich: Sie verlangt zusätzlich gute Kann-Kriterien, die unveröffentlicht sind.
// Der Quick-Check nennt die Ausnahmen mit „oder“, deshalb zählt für die Oase höchstens eine.
export function evaluate(state) {
  const strict = strictCriteria.map((c) => ({
    id: c.id,
    title: c.title,
    state: state.strict[c.id] === null ? 'open' : state.strict[c.id] ? 'ok' : 'fail',
  }))
  const counts = countCriteria.map((c) => ({
    id: c.id,
    title: c.title,
    state: countState(c, state.counts[c.id]),
  }))

  const native = { id: nativeCriterion.id, title: nativeCriterion.title, state: nativeState(state.native) }
  const othersAnswered = [native, ...strict, ...counts].every((item) => item.state !== 'open')
  const biotopeCount = state.biotopes.length
  let biotopeState = 'ok'
  if (biotopeCount < REQUIRED_BIOTOPES) biotopeState = othersAnswered ? 'fail' : 'open'

  const items = [
    native,
    ...strict,
    ...counts,
    { id: 'biotopes', title: `Mindestens ${REQUIRED_BIOTOPES} Klein-Biotopelemente`, state: biotopeState },
  ]

  const failed = items.filter((item) => item.state === 'fail')
  const open = items.filter((item) => item.state === 'open')
  const exceptions = items.filter((item) => item.state === 'exception')

  const oasisOnly = items.filter((item) => item.state === 'oasisOnly')
  const tooManyExceptions = exceptions.length > 1

  let status = 'open'
  if (failed.length > 0 || tooManyExceptions) status = 'missing'
  else if (open.length > 0) status = 'open'
  else if (exceptions.length === 0 && oasisOnly.length === 0) status = 'bronze'
  else status = 'oasis'

  return { status, items, failed, open, exceptions, oasisOnly, tooManyExceptions, biotopeCount }
}
