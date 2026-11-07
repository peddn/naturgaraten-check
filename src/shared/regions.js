// Die 16 Bundesländer. Module geben in `regions` Länderkürzel an oder 'DE' für bundesweit.
export const NATIONWIDE = 'DE'

export const states = [
  { code: 'BW', slug: 'baden-wuerttemberg', name: 'Baden-Württemberg' },
  { code: 'BY', slug: 'bayern', name: 'Bayern' },
  { code: 'BE', slug: 'berlin', name: 'Berlin' },
  { code: 'BB', slug: 'brandenburg', name: 'Brandenburg' },
  { code: 'HB', slug: 'bremen', name: 'Bremen' },
  { code: 'HH', slug: 'hamburg', name: 'Hamburg' },
  { code: 'HE', slug: 'hessen', name: 'Hessen' },
  { code: 'MV', slug: 'mecklenburg-vorpommern', name: 'Mecklenburg-Vorpommern' },
  { code: 'NI', slug: 'niedersachsen', name: 'Niedersachsen' },
  { code: 'NW', slug: 'nordrhein-westfalen', name: 'Nordrhein-Westfalen' },
  { code: 'RP', slug: 'rheinland-pfalz', name: 'Rheinland-Pfalz' },
  { code: 'SL', slug: 'saarland', name: 'Saarland' },
  { code: 'SN', slug: 'sachsen', name: 'Sachsen' },
  { code: 'ST', slug: 'sachsen-anhalt', name: 'Sachsen-Anhalt' },
  { code: 'SH', slug: 'schleswig-holstein', name: 'Schleswig-Holstein' },
  { code: 'TH', slug: 'thueringen', name: 'Thüringen' },
]

export const stateByCode = (code) => states.find((s) => s.code === code) ?? null
export const stateBySlug = (slug) => states.find((s) => s.slug === slug) ?? null

// Teilt die Module eines Landes in landeseigene und bundesweite Angebote.
export function modulesForState(modules, code) {
  return {
    regional: modules.filter((m) => m.regions.includes(code)),
    nationwide: modules.filter((m) => m.regions.includes(NATIONWIDE)),
  }
}
