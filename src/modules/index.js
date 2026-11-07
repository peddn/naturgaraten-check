// Jedes Modul unter src/modules/<id>/index.js wird automatisch eingebunden.
// Reihenfolge: `order`, danach Titel.
const found = import.meta.glob('./*/index.js', { eager: true, import: 'default' })

export const modules = Object.values(found).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100) || a.title.localeCompare(b.title, 'de'),
)
