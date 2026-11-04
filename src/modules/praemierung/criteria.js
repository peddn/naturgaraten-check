// Naturgartenprämierung, 2019 bis 2025 unter „Tausende Gärten – Tausende Arten“,
// seit 2026 bei NaturGarten e.V. Grundlage: aktueller Quick-Check von NaturGarten e.V.
// Die Bewertungsmatrix ist nicht veröffentlicht. Silber und Gold lassen sich nicht berechnen.

export const CRITERIA_VERSION = 'aktuelle Quick-Check von NaturGarten e.V.'
export const REQUIRED_BIOTOPES = 2

// Bronze verlangt heimische Wildpflanzen, die Grüne Oase nur heimische Pflanzen.
export const nativeCriterion = {
  id: 'native',
  title: 'Mindestens 50 % heimische Pflanzen',
  question: 'Was wächst auf mindestens der Hälfte deiner Fläche?',
  hint: 'Bereiche mit Nutzpflanzen zählen nicht mit, Dachbegrünung schon. Ob eine Art heimisch ist, zeigt floraweb.de.',
  options: [
    { value: 'wild', label: 'Heimische Wildpflanzen', tone: 'good' },
    { value: 'native', label: 'Heimische Pflanzen', tone: 'warn' },
    { value: 'none', label: 'Beides nicht', tone: 'bad' },
  ],
}

export const strictCriteria = [
  {
    id: 'animals',
    title: 'Tierwohl',
    question: 'Gibt es keine Tierfallen und möglichst wenig künstliches Licht?',
    hint: 'Unbeabsichtigte Fallen können in Lichtschächten, Teichen oder nach oben offenen Rohren entstehen.',
  },
  {
    id: 'noPeat',
    title: 'Kein Torf',
    question: 'Verzichtest du auf Torf?',
  },
  {
    id: 'noPesticides',
    title: 'Keine Pestizide',
    question: 'Verzichtest du auf Pestizide?',
  },
  {
    id: 'noFertilizer',
    title: 'Kein Kunstdünger',
    question: 'Verzichtest du auf Kunstdünger?',
  },
]

export const countCriteria = [
  {
    id: 'neophytes',
    title: 'Invasive Neophyten',
    question: 'Wie viele Arten invasiver Neophyten wachsen bei dir?',
    hint: 'Das sind gebietsfremde Pflanzen, die heimische Arten verdrängen und die Biodiversität schädigen. Der Quick-Check nennt als Beispiel den Flieder. Mehr steht im Neophyten-Handbuch von NaturGarten e.V.',
    limit: 2,
    options: [
      { value: 0, label: 'Keine', tone: 'good' },
      { value: 1, label: '1 Art', tone: 'warn' },
      { value: 2, label: '2 Arten', tone: 'warn' },
      { value: 3, label: 'Mehr', tone: 'bad' },
    ],
  },
  {
    id: 'overseas',
    title: 'Baustoffe aus Übersee oder Raubbau',
    question: 'Wie viele solcher Baustoffe hast du verwendet, etwa Steine aus Übersee oder Tropenholz?',
    limit: 1,
    options: [
      { value: 0, label: 'Keinen', tone: 'good' },
      { value: 1, label: 'Einen', tone: 'warn' },
      { value: 2, label: 'Mehrere', tone: 'bad' },
    ],
  },
  {
    id: 'treatedWood',
    title: 'Chemisch behandeltes Holz',
    question: 'Wie viele Gartenelemente sind mit chemischem Holzschutz behandelt?',
    limit: 1,
    options: [
      { value: 0, label: 'Keines', tone: 'good' },
      { value: 1, label: 'Eines', tone: 'warn' },
      { value: 2, label: 'Mehrere', tone: 'bad' },
    ],
  },
]

export const biotopes = [
  { id: 'totholz', label: 'Totholz' },
  { id: 'sand', label: 'Sandfläche für Insekten' },
  { id: 'teich', label: 'Teich' },
  { id: 'wiese', label: 'Blumenwiese' },
  { id: 'trockenmauer', label: 'Trockenmauer' },
  { id: 'nisthilfen', label: 'Nisthilfen' },
  { id: 'steinhaufen', label: 'Steinhaufen' },
]

export const testerFocus = [
  'Vielfalt einheimischer Wildpflanzen aus gesicherter Herkunft',
  'Begrünte Dächer und Fassaden, Bauwerke aus unbehandeltem Holz',
  'Begrünte Wegebefestigungen und Trockenmauern',
  'Nisthilfen für Vögel, Insekten und Kleinsäuger',
  'Biotopelemente wie Sand- und Wasserflächen, Steinhaufen oder Totholz',
  'Regenrückhalteflächen und Versickerungsmöglichkeiten',
  'Verzicht auf Biozide, Mineraldünger, Torf, PVC und invasive Neophyten',
  'Wenig künstliche Beleuchtung und gesicherte Schächte',
  'Nachhaltige Materialien aus der Region oder aus Recycling',
]
