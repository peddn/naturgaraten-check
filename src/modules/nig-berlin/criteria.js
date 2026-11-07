// „Natur im Garten“ Berlin. Grundlage: „Natur im Garten“ Kriterien, ausformuliert (Berlin),
// erstellt am 27.03.2025. Texte gekürzt, Belege in docs/module/nig-berlin.md.

export const CRITERIA_VERSION = 'Kriterienpapier vom 27.03.2025'
export const REQUIRED = 7

export const core = [
  {
    id: 'pestizide',
    title: 'Verzicht auf chemisch-synthetische Pestizide',
    question: 'Verzichtest du darauf?',
    hint: 'Nur als letzte Maßnahme sind biokonforme Mittel erlaubt, die der EU-Bio-Verordnung oder dem „Natur im Garten“-Gütesiegel entsprechen.',
  },
  {
    id: 'duenger',
    title: 'Verzicht auf chemisch-synthetische Dünger',
    question: 'Verzichtest du darauf?',
    hint: 'Organische Fertigdünger sind erlaubt, falls nötig.',
  },
  {
    id: 'torf',
    title: 'Verzicht auf Torf',
    question: 'Verzichtest du darauf, auch bei Topfpflanzen?',
    hint: 'Achte bei fertigen Pflanzenerden darauf, dass sie keinen Torf enthalten.',
  },
]

export const basics = [
  {
    id: 'grundgeruest',
    title: 'Heimisches Grundgerüst der Bepflanzung',
    question: 'Besteht das Grundgerüst aus Blumen, Stauden, Sträuchern und Bäumen aus heimischen, ökologisch wertvollen und standortgerechten Arten?',
  },
  {
    id: 'versiegelung',
    title: 'Großteil der Fläche unversiegelt',
    question: 'Ist der Großteil deiner Fläche nicht versiegelt?',
    hint: 'Ein Teil der unversiegelten Fläche darf aus wassergebundenen Decken oder durchlässigen Belägen bestehen.',
  },
]

export const groups = [
  {
    id: 'naturgartenelemente',
    title: 'Naturgartenelemente und naturnahe Bepflanzung',
    criteria: [
      { id: 'wildgehoelze', art: 'hecke', title: 'Wildgehölze oder Wildstrauchhecke', text: 'Am besten aus mehreren einheimischen oder regionaltypischen Arten' },
      { id: 'wiese', art: 'wiese', title: 'Wildblumenwiese oder Naturwiese', text: 'Auch kleine Flächen, höchstens zweimal im Jahr gemäht' },
      { id: 'kraeuterrasen', art: 'wildkraut', title: 'Kräuterrasen oder Naturrasen', text: 'Gräser gemischt mit Kräutern wie Gänseblümchen, Schafgarbe oder Günsel' },
      { id: 'wildwuchs', art: 'wildkraut', title: 'Wildwuchs zulassen', text: 'Wildblumen am Heckensaum, in Beeten und in Fugen' },
      { id: 'wildesEck', art: 'wildesEck', title: 'Wildes Eck', text: 'Ruhig gelegen, wenn überhaupt nur im Frühjahr abgeräumt' },
      { id: 'sonderstandorte', art: 'lebensraum', title: 'Sonderstandorte', text: 'Feuchtbiotop oder Trockensteinmauer' },
      { id: 'baeume', art: 'baum', title: 'Laubbäume und heimische Nadelgehölze', text: 'Standortgerecht, auch große, nicht auf Ertrag geschnittene Obstbäume, in sehr kleinen Gärten auch Kletterpflanzen' },
      { id: 'blumen', art: 'blumen', title: 'Heimische oder ökologisch wertvolle Blumen und Stauden', text: 'Mit ungefüllten Blüten, verblühte Stängel bleiben über den Winter stehen' },
    ],
  },
  {
    id: 'bewirtschaftung',
    title: 'Ökologische Bewirtschaftung',
    criteria: [
      { id: 'kompost', art: 'kompost', title: 'Komposthaufen, Wurmbox oder Bokashi' },
      { id: 'obstbaeume', art: 'obst', title: 'Obstbäume' },
      { id: 'beeren', art: 'obst', title: 'Beerensträucher oder Naschhecke' },
      { id: 'gemuese', art: 'gemuese', title: 'Gemüsebeete und Kräuter' },
      { id: 'mulchen', art: 'boden', title: 'Mulchen', text: 'Mit Rasenschnitt, Häckselgut, Laub oder Stroh' },
      { id: 'nuetzlinge', art: 'nuetzlinge', title: 'Nützlingsunterkünfte', text: 'Zum Beispiel Altholz- und Steinhaufen, Nisthilfen. Keine durchgehenden Zaunfundamente, damit Igel und Kröten durchkommen.' },
      { id: 'material', art: 'material', title: 'Umweltfreundliche Materialwahl', text: 'Regionaltypische Steine, unbehandeltes, witterungsbeständiges Holz, schadstofffreies Recyclingmaterial' },
      { id: 'streusalz', art: null, title: 'Kein Streusalz', text: 'Stattdessen Splitt oder Sand' },
      { id: 'spielgeraete', art: null, title: 'Umweltfreundliches Material bei Spielgeräten', text: 'Naturbelassenes oder umweltfreundlich behandeltes Holz' },
    ],
  },
  {
    id: 'klima',
    title: 'Maßnahmen zur Klimawandelanpassung',
    criteria: [
      { id: 'klimabaeume', title: 'Klimawirksame Bäume', text: 'Großkronige Bäume, die Schatten spenden' },
      { id: 'fassade', title: 'Fassaden- oder Vertikalbegrünung' },
      { id: 'dach', title: 'Dachbegrünung' },
      { id: 'regenwasser', title: 'Regenwasser sammeln', text: 'In Tonnen oder Tanks' },
      { id: 'versickerung', title: 'Viele versickerungsfähige Wege und Plätze', text: 'Wassergebundene Decken oder in Sand verlegte Steine' },
      { id: 'stellplaetze', title: 'Ökologisch gestaltete Stellplätze', text: 'Bepflanzt, unversiegelt und flächensparend' },
    ],
  },
]

export const bonus = [
  'Keine Lichtverschmutzung',
  'Garten nahezu plastikfrei',
  'Tierschonende Pflege, Mähroboter wenn überhaupt nur tagsüber',
]

export const config = { core, basics, groups, required: REQUIRED }
