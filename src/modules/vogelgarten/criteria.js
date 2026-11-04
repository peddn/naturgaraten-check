// Vorprüfung „Vogelfreundlicher Garten“ von LBV und Bayerischem Artenschutzzentrum.
// Grundlage: Anmeldeseite des LBV mit FAQ und Faltblatt des LfU.
// Der Kriterienkatalog der Jury ist nicht öffentlich, deshalb gibt es hier nur die Vorprüfung.

export const REQUIRED_MUST = 2

export const mustCriteria = [
  {
    id: 'insekten',
    title: 'Insektenvielfalt',
    question: 'Finden Insekten bei dir viel Nahrung und Lebensraum?',
    hint: 'Hilfreich sind heimische Pflanzen, die von Frühjahr bis Herbst blühen.',
  },
  {
    id: 'fruechte',
    title: 'Früchte, Beeren oder Samen',
    question: 'Finden Vögel bei dir Früchte, Beeren oder Samen?',
    hint: 'Dazu zählen fruchttragende Bäume und Sträucher und Samenstände, die über den Winter stehen bleiben.',
  },
  {
    id: 'nistmaterial',
    title: 'Nistmaterial',
    question: 'Gibt es bei dir Nistmaterial?',
    hint: 'Es kann natürlich oder künstlich sein.',
  },
  {
    id: 'wildeEcke',
    title: 'Wilde Ecke',
    question: 'Hast du mindestens eine wilde Ecke?',
  },
]

export const exclusionCriteria = [
  {
    id: 'pestizide',
    title: 'Pestizide',
    question: 'Setzt du Pestizide ein?',
    hint: 'Dazu zählen auch Leimringe, Pheromonfallen und Bacillus thuringiensis (BT).',
    stricter: 'Strenger als „Bayern blüht – Naturgarten“: Dort sind BT-Mittel und Leimringe erlaubt, hier führen sie zum Ausschluss.',
  },
  {
    id: 'geraete',
    title: 'Mähroboter, Laubsauger oder Laubbläser',
    question: 'Nutzt du eines dieser Geräte?',
    hint: 'Das gilt auch, wenn das Gerät nur tagsüber oder nur auf Teilflächen wie der Einfahrt läuft.',
  },
  {
    id: 'versiegelung',
    title: 'Unnötige neue Versiegelung',
    question: 'Hast du unnötig neue Flächen versiegelt?',
  },
  {
    id: 'vlies',
    title: 'Unkrautvlies mit Kies auf Pflanzflächen',
    question: 'Gibt es bei dir Pflanzflächen mit Unkrautvlies und Kies?',
    hint: 'Auf Wegen, Sitz- und Spielplätzen ist das in Ordnung, ebenso als Gießring bei Neupflanzungen.',
  },
  {
    id: 'mulch',
    title: 'Flächiger Rindenmulch oder Hackschnitzel',
    question: 'Deckst du Flächen großflächig damit ab?',
    hint: 'Auf Wegen, Sitz- und Spielplätzen ist das in Ordnung, ebenso als Gießring bei Neupflanzungen.',
  },
]

export const juryFocus = [
  'Nahrung, Deckung und Nistmöglichkeiten',
  'Arten- und strukturreiche Gestaltung',
  'Heimische Pflanzen mit Blüten von Frühjahr bis Herbst',
  'Stehen gelassene Samenstände im Winter',
  'Fruchttragende Bäume und Sträucher',
  'Futter- und Wasserstellen',
]
