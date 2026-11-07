// „Natur im Garten“ Baden-Württemberg, Landesverband der Gartenfreunde Baden-Württemberg e.V.
// Grundlage: „Bewertungskriterien Plakettenvergabe NATUR im GARTEN“, Interessentenblatt vom 08.08.2023.
// Texte gekürzt, Belege in docs/module/nig-bw.md.

export const CRITERIA_VERSION = 'Interessentenblatt vom 08.08.2023'

export const core = [
  {
    id: 'pestizide',
    title: 'Verzicht auf chemisch-synthetische Pestizide',
    question: 'Verzichtest du darauf?',
    hint: 'Erlaubt sind nur Mittel, die der EU-Bioverordnung und dem „Natur im Garten“-Gütesiegel entsprechen.',
  },
  {
    id: 'duenger',
    title: 'Verzicht auf chemisch-synthetische Dünger',
    question: 'Verzichtest du darauf?',
  },
  {
    id: 'torf',
    title: 'Verzicht auf Torf',
    question: 'Verzichtest du darauf?',
  },
]

export const categories = [
  {
    id: 'naturgartenelemente',
    title: 'Naturgartenelemente',
    navLabel: 'Elemente',
    required: 7,
    criteria: [
      {
        id: 'blumen',
        art: 'blumen',
        title: 'Heimische oder ökologisch wertvolle Blumen und Stauden',
        partial: 'Mindestens 5 Arten mit ungefüllten Blüten',
        full: 'Mindestens 10 Arten mit ungefüllten Blüten, ein- oder mehrjährig',
        tip: 'Ergänze ungefüllt blühende Wildarten, bis du mindestens 10 Arten hast.',
      },
      {
        id: 'wildgehoelze',
        art: 'hecke',
        title: 'Wildgehölze und Wildstrauchhecken',
        partial: 'Hecke oder Sträuchergruppe aus 1 oder 2 heimischen, regionaltypischen oder ökologisch wertvollen Arten',
        full: 'Mindestens 3 einheimische oder regionaltypische Gehölzarten, im Garten ausgewogen',
        hint: 'In kleinen Gärten zählen auch einzelne heimische Solitärsträucher.',
        allotmentNote: 'Hecken sind in manchen Gartenordnungen verboten.',
        tip: 'Pflanze weitere heimische Sträucher, bis es mindestens drei Arten sind.',
      },
      {
        id: 'kraeuterrasen',
        art: 'wildkraut',
        title: 'Kräuterrasen oder Naturrasen',
        partial: 'Nur vereinzelt Kräuter wie Löwenzahn oder Gänseblümchen',
        full: 'Gräser mit mindestens 5 Kräutern wie Schafgarbe, Günsel, Gundermann, Braunelle oder Wegerich',
        tip: 'Lass Kräuter im Rasen stehen, bis es mindestens fünf Arten sind.',
      },
      {
        id: 'wiese',
        art: 'wiese',
        title: 'Wildblumenwiese oder Naturwiese',
        partial: 'Sehr kleine Wiesenbereiche oder Wildblumeninseln im Rasen',
        full: 'Wildblumenwiese, höchstens zweimal im Jahr gemäht',
        tip: 'Mähe eine Wiesenfläche höchstens zweimal im Jahr.',
      },
      {
        id: 'sonderstandorte',
        art: 'lebensraum',
        title: 'Sonderstandorte: Feucht- oder Trockenbiotop',
        partial: 'Ein Teich, der Wasserorganismen das Ansiedeln erschwert, eine magere trockene Fläche oder eine betonierte Mauer mit wenig Bewuchs',
        full: 'Ein bepflanzter Teich ohne größere Fische und/oder eine Trockensteinmauer',
        hint: 'Sandbereiche für Wildbienen zählen als magere trockene Standorte.',
        allotmentNote: 'Feuchtbiotope sind in manchen Gartenordnungen verboten, Trockenbiotope nicht.',
        tip: 'Baue eine Trockensteinmauer oder bepflanze deinen Teich.',
      },
      {
        id: 'baeume',
        art: 'baum',
        title: 'Standortgerechte Bäume',
        partial: 'Ein einheimischer oder ökologisch wertvoller, standortgerechter Baum',
        full: 'Ein oder mehrere einheimische oder ökologisch wertvolle, standortgerechte Bäume',
        hint: 'Große, nicht auf Ertrag geschnittene Obstbäume zählen hier. In sehr kleinen Gärten können Kletterpflanzen Bäume ersetzen.',
        allotmentNote: 'Für Kleingartenparzellen nicht anwendbar, weil Großgehölze dort verboten sind.',
        tip: 'Pflanze einen weiteren heimischen, standortgerechten Baum.',
      },
      {
        id: 'wildesEck',
        art: 'wildesEck',
        title: 'Wildes Eck',
        partial: 'Ein kleines wildes Eck, nach Größe, Lage oder Pflege nicht optimal',
        full: 'In ruhiger Lage und wenn überhaupt nur im Frühjahr abgeräumt',
        tip: 'Lass das wilde Eck in Ruhe und räume es höchstens im Frühjahr ab.',
      },
      {
        id: 'wildwuchs',
        art: 'wildkraut',
        title: 'Wildwuchs zulassen',
        partial: 'Wildblumen am Heckensaum, in Beeten oder Fugen nur ansatzweise',
        full: 'Wildblumensaum an Hecken mit Selbstaussaat und/oder schwachwüchsige Pflanzen in Beeten und Fugen',
        hint: 'Zum Beispiel Acker-Stiefmütterchen, Duftveilchen, Ehrenpreis oder Hirtentäschel.',
        tip: 'Lass in Beeten und Fugen schwachwüchsige Wildpflanzen stehen.',
      },
    ],
  },
  {
    id: 'bewirtschaftung',
    title: 'Ökologische Bewirtschaftung',
    navLabel: 'Bewirtschaftung',
    required: 5,
    criteria: [
      {
        id: 'kompost',
        art: 'kompost',
        title: 'Komposthaufen, Wurmbox oder Bokashi',
        partial: 'Pflanzenabfälle liegen an einer Stelle, werden aber nicht sachgerecht kompostiert oder weiterverwendet',
        full: 'Ein Komposthaufen, dessen fertiger Kompost im Garten eingesetzt wird',
        hint: 'In kleinen Gärten zählen auch Wurmbox oder Bokashi.',
        tip: 'Setze den fertigen Kompost gezielt im Garten ein.',
      },
      {
        id: 'mulchen',
        art: 'boden',
        title: 'Mulchen',
        partial: 'Mulchen mit Rasenschnitt, Laub oder Ähnlichem in einem einzelnen Bereich',
        full: 'Mulchen im gesamten Garten: Gemüsebeete, Staudenbeete und unter Sträuchern',
        tip: 'Mulche auch Staudenbeete und die Flächen unter Sträuchern.',
      },
      {
        id: 'gemuese',
        art: 'gemuese',
        title: 'Gemüse- und Kräutergarten',
        partial: 'Einzelne Gemüsepflanzen oder Kräuter',
        full: 'Ein Gemüse- und/oder Kräutergarten',
        tip: 'Lege ein Gemüse- oder Kräuterbeet an.',
      },
      {
        id: 'mischkultur',
        art: 'boden',
        title: 'Mischkultur, Fruchtfolge, Gründüngung',
        partial: 'Eine der drei Methoden',
        full: 'Zwei oder alle drei Methoden',
        tip: 'Nimm eine zweite Methode dazu, etwa Gründüngung über den Winter.',
      },
      {
        id: 'obst',
        art: 'obst',
        title: 'Obstgarten und Beerensträucher',
        partial: 'Ein Obstbaum und/oder weniger als 3 Beerensträucher',
        full: 'Zwei oder mehr Obstbäume und/oder 3 Beerensträucher',
        allotmentNote: 'In Kleingärten zählen auch Obstbäume auf schwach- bis mittelstark wachsenden Unterlagen.',
        tip: 'Pflanze Beerensträucher, bis es mindestens drei sind.',
      },
      {
        id: 'regen',
        art: 'regen',
        title: 'Regenwassernutzung',
        partial: 'Regenwasser nur für Teilbereiche',
        full: 'Regenwasser für den gesamten Garten, mit ausreichend Speichervolumen',
        tip: 'Vergrößere den Speicher, damit das Regenwasser für den ganzen Garten reicht.',
      },
      {
        id: 'material',
        art: 'material',
        title: 'Umweltfreundliche Materialwahl',
        partial: 'Eines dieser Materialien: regionaltypisches Gestein, witterungsbeständiges Holz, schadstofffreies Recyclingmaterial',
        full: 'Zwei oder mehr dieser Materialien',
        tip: 'Verwende ein zweites umweltfreundliches Material, etwa regionaltypisches Gestein.',
      },
      {
        id: 'nuetzlinge',
        art: 'nuetzlinge',
        title: 'Nützlingsunterkünfte',
        partial: 'Strauchschnitt- oder Steinhaufen, die nur vorübergehend liegen',
        full: 'Natürliche oder gebaute Unterkünfte für Nützlinge sind vorhanden',
        tip: 'Lass Reisig- oder Steinhaufen dauerhaft liegen oder häng Nisthilfen auf.',
      },
    ],
  },
]

// Bonuspunkte zählen laut Interessentenblatt nicht zu den Pflichtpunkten.
export const bonus = [
  'Geringe Bodenversiegelung, versickerungsoffene Beläge',
  'Überschüssiges Regenwasser wird versickert',
  'Garten nahezu frei von Kunststoffen',
  'Keine Lichtverschmutzung',
  'Tierschonende Pflege, keine Einfriedungen, die Tiere aufhalten',
  'Informationstafeln oder Namensschilder an Pflanzen',
]

export const ALLOTMENT_BLOCKED = 'baeume'
export const config = { core, categories }
