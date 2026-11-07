// „Natur im Garten“ Thüringen e.V. Grundlage: Flyer „Der Weg zur Plakette“, undatiert.
// Der Flyer nennt keine Mindestzahl für die Elemente, daher nur Vorprüfung.
// Belege in docs/module/nig-thueringen.md.

export const CRITERIA_VERSION = 'Flyer „Der Weg zur Plakette“'

export const core = [
  {
    id: 'pestizide',
    title: 'Verzicht auf chemisch-synthetische Pestizide',
    question: 'Verzichtest du darauf?',
    hint: 'Erlaubt sind Pflanzenschutzmittel, die der EU-Bio-Verordnung entsprechen.',
  },
  { id: 'duenger', title: 'Verzicht auf chemisch-synthetische Dünger', question: 'Verzichtest du darauf?' },
  { id: 'torf', title: 'Verzicht auf Torf', question: 'Verzichtest du darauf?' },
]

export const groups = [
  {
    id: 'naturgartenelemente',
    title: 'Naturgartenelemente',
    criteria: [
      { id: 'wildstraeucher', art: 'hecke', title: 'Wildsträucher' },
      { id: 'wiese', art: 'wiese', title: 'Wiese' },
      { id: 'wildwuchs', art: 'wildkraut', title: 'Zulassen von Wildwuchs' },
      { id: 'sonderstandorte', art: 'lebensraum', title: 'Sonderstandorte, feucht oder trocken' },
      { id: 'wildesEck', art: 'wildesEck', title: 'Wildes Eck' },
      { id: 'totholz', art: 'nuetzlinge', title: 'Totholz und Steine' },
      { id: 'laubbaeume', art: 'baum', title: 'Laubbäume' },
      { id: 'blumen', art: 'blumen', title: 'Blumen und blühende Stauden' },
    ],
  },
  {
    id: 'bewirtschaftung',
    title: 'Bewirtschaftung und Nutzgarten',
    criteria: [
      { id: 'kompost', art: 'kompost', title: 'Kompost' },
      { id: 'nuetzlinge', art: 'nuetzlinge', title: 'Nützlingsunterkünfte' },
      { id: 'regen', art: 'regen', title: 'Regenwassernutzung' },
      { id: 'material', art: 'material', title: 'Umweltfreundliche Materialien' },
      { id: 'mulchen', art: 'boden', title: 'Mulchen' },
      { id: 'gemuese', art: 'gemuese', title: 'Gemüse- und Kräuterbeete' },
      { id: 'obst', art: 'obst', title: 'Obstgarten und Beerensträucher' },
      { id: 'mischkultur', art: 'boden', title: 'Mischkultur und Fruchtfolge' },
      { id: 'gruenduengung', art: 'wiese', title: 'Gründüngung' },
    ],
  },
]

export const config = { must: core }
