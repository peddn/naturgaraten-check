import { REQUIRED_BIOTOPES, biotopes, countCriteria, strictCriteria } from './criteria.js'

export function createEmptyState() {
  return {
    strict: Object.fromEntries(strictCriteria.map((c) => [c.id, null])),
    counts: Object.fromEntries(countCriteria.map((c) => [c.id, null])),
    biotopes: [],
  }
}

export function sanitizeState(input) {
  const state = createEmptyState()
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

// Mögliche Stufen: bronze, oasis, unclear, missing, open.
// Oase gilt nur als möglich: Sie verlangt zusätzlich gute Kann-Kriterien, die unveröffentlicht sind.
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

  const othersAnswered = [...strict, ...counts].every((item) => item.state !== 'open')
  const biotopeCount = state.biotopes.length
  let biotopeState = 'ok'
  if (biotopeCount < REQUIRED_BIOTOPES) biotopeState = othersAnswered ? 'fail' : 'open'

  const items = [
    ...strict,
    ...counts,
    { id: 'biotopes', title: `Mindestens ${REQUIRED_BIOTOPES} Klein-Biotopelemente`, state: biotopeState },
  ]

  const failed = items.filter((item) => item.state === 'fail')
  const open = items.filter((item) => item.state === 'open')
  const exceptions = items.filter((item) => item.state === 'exception')

  let status = 'open'
  if (failed.length > 0) status = 'missing'
  else if (open.length > 0) status = 'open'
  else if (exceptions.length === 0) status = 'bronze'
  else if (exceptions.length === 1) status = 'oasis'
  else status = 'unclear'

  return { status, items, failed, open, exceptions, biotopeCount }
}
