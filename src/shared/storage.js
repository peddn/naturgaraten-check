const APP_ID = 'naturgarten-check'
const FORMAT_VERSION = 2

export function loadAnswers(key, createEmpty, sanitize, storage = globalThis.localStorage) {
  try {
    const raw = storage.getItem(key)
    return raw ? sanitize(JSON.parse(raw)) : createEmpty()
  } catch {
    return createEmpty()
  }
}

export function saveAnswers(key, answers, storage = globalThis.localStorage) {
  try {
    storage.setItem(key, JSON.stringify(answers))
    return true
  } catch {
    return false
  }
}

export function serializeExport(modules, now = new Date()) {
  return JSON.stringify(
    { app: APP_ID, version: FORMAT_VERSION, exportedAt: now.toISOString(), modules },
    null,
    2,
  )
}

// Liefert die Antworten pro Modul. Version 1 kannte nur den Naturgarten-Check.
export function parseImport(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Die Datei enthält kein gültiges JSON. Wähle eine exportierte Datei aus.')
  }
  if (data?.app !== APP_ID) {
    throw new Error('Diese Datei stammt nicht aus dem Garten-Check. Wähle eine exportierte Datei aus.')
  }
  if (data.version === 1 && data.garden) return { naturgarten: data.garden }
  if (data.version === FORMAT_VERSION && data.modules && typeof data.modules === 'object') {
    return data.modules
  }
  throw new Error(`Das Dateiformat ${data.version} wird nicht unterstützt.`)
}

export function exportFileName(label = '') {
  const slug = label
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `garten-check${slug ? `-${slug}` : ''}.json`
}
