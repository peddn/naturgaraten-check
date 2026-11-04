// Kriterien der Gartenzertifizierung „Bayern blüht – Naturgarten“.
// Inhaltliche Grundlage: Zertifizierungsbogen (Stand 24.04.2019) und
// „Details zu den Kriterien“ (Stand März 2023). Die Texte sind gekürzt.

export const REQUIRED_SMILEYS = 7
export const CRITERIA_VERSION = 'März 2023'

// Die drei Verzichtsregeln: Jede muss vollständig erfüllt sein.
export const coreCriteria = [
  {
    id: 'pflanzenschutz',
    title: 'Keine chemischen Pflanzenschutzmittel',
    question: 'Verzichtest du im ganzen Garten darauf, auch bei Zierpflanzen?',
    hint: 'Erlaubt sind Mittel aus Anhang II der Verordnung (EG) Nr. 889/2008 mit Zulassung für Haus- und Kleingarten, zum Beispiel Schwefel, Kaliseife, Raps- und Paraffinöl oder Bacillus thuringiensis. Unkrautvernichter sind tabu.',
  },
  {
    id: 'duenger',
    title: 'Keine chemisch-synthetischen Dünger',
    question: 'Düngst du nur organisch oder mit erlaubten Mitteln?',
    hint: 'Erlaubt sind Mittel aus Anhang I derselben Verordnung, zum Beispiel Kompost, Hornprodukte, Gründüngung, Gesteinsmehl, Stallmist oder Brennnesseljauche.',
  },
  {
    id: 'torf',
    title: 'Kein Torf',
    question: 'Gärtnerst du torffrei, auch in Kübeln und Balkonkästen?',
    hint: 'Schau auf die Packung: Bioerde kann einen gewissen Anteil Torf enthalten. Anzuchterde sollte keinen oder nur wenig Torf enthalten.',
  },
]

// Viertes Kernkriterium: Laut Leitfaden wird es erst nach dem Rundgang beurteilt.
export const overallCriterion = {
  id: 'gesamteindruck',
  title: 'Hohe ökologische Vielfalt',
  question: 'Bietet dein Garten insgesamt viele verschiedene Lebensräume für Tiere und Pflanzen?',
  hint: 'Gemeint sind etwa Trockenmauern, Stein- und Holzhaufen, Feuchtbiotope, Blumenwiesen, Hecken mit Säumen, Sonnen- und Schattenplätze oder begrünte Fassaden. Auch kleine Gärten können das schaffen. Auf Mähroboter, Laubsauger und nächtliche Beleuchtung wird verzichtet.',
}

export const allCoreCriteria = [...coreCriteria, overallCriterion]

export const categories = [
  {
    id: 'vielfalt',
    title: 'Naturgartenelemente',
    intro: 'Was wächst und lebt in deinem Garten?',
    criteria: [
      {
        id: 'blumen',
        title: 'Einfach blühende Blumen und Stauden',
        partial: '5 bis 9 Arten mit ungefüllten Blüten',
        full: 'Mehr als 9 Arten, im Garten verteilt und zu verschiedenen Zeiten blühend',
        hint: 'Die Zahlen gelten im Verhältnis zur Grundstücksgröße. Einige gefüllt blühende Arten führen nicht zur Abwertung.',
        tip: 'Ergänze ungefüllt blühende Arten wie Wiesensalbei, Dost, Schafgarbe oder Astern, die zu verschiedenen Zeiten blühen.',
      },
      {
        id: 'hecke',
        title: 'Variantenreiche Strauchhecke und Gehölze',
        partial: 'Eine oder zwei standortgerechte Laubgehölzarten',
        full: 'Mehr als zwei standortgerechte Laubgehölzarten',
        hint: 'Besonders wertvoll sind heimische Gehölze. Forsythien bieten Insekten keinen Nutzen.',
        tip: 'Pflanze weitere heimische Sträucher wie Hartriegel, Liguster, Weißdorn, Holunder oder Wildrosen.',
      },
      {
        id: 'baum',
        title: 'Standortgerechte Laub- und Obstbäume',
        partial: 'Ein Laubbaum und/oder einzelne Großsträucher',
        full: 'Mehrere verschiedene Laubbäume und/oder Großsträucher',
        hint: 'In sehr kleinen Gärten können Kletterpflanzen, Wandspaliere oder schwach wachsende Gehölze große Bäume ersetzen. Ein einzelnes Nadelgehölz zwischen vielen Laubgehölzen wird nicht negativ gewertet.',
        tip: 'Pflanze einen weiteren Baum oder Großstrauch, etwa Vogelbeere, Feldahorn, Kornelkirsche oder Felsenbirne.',
      },
      {
        id: 'lebensraum',
        title: 'Vielfalt der Lebensräume',
        partial: 'Einfache Elemente, etwa ein Wassertrog oder eine Mauer mit wenig Fugen',
        full: 'Mindestens 3 Elemente wie bepflanzter Teich, Trockenmauer, offene Sandfläche, Holz- oder Steinhaufen',
        hint: 'Trockenmauern zählen voll, wenn sie ohne Mörtel geschichtet und in den Fugen vielfältig bewachsen sind.',
        tip: 'Lege eine offene Sandfläche, einen Stein- oder Holzhaufen oder einen bepflanzten Teich an.',
      },
      {
        id: 'wiese',
        title: 'Extensive Grünfläche, Wiese und Wiesenelemente',
        partial: 'Kleine Wiesenbereiche oder extensive Grünfläche mit Kräutern',
        full: 'Blumenwiese oder Blumeninseln, höchstens dreimal im Jahr gemäht',
        hint: 'Auch mehrere kleine Flächen zählen. Kräuterreiche Magerrasen werden nur ein- bis zweimal gemäht.',
        tip: 'Lass eine Rasenfläche als Blumeninsel stehen und mähe sie nur noch zwei- bis dreimal im Jahr.',
      },
      {
        id: 'wildesEck',
        title: 'Wildes Eck',
        partial: 'Eine Fläche, die nur bedingt naturbelassen ist',
        full: 'Sich selbst überlassen, mehrere Arten, wenn überhaupt erst im späten Frühjahr abgeräumt',
        hint: 'Hier dürfen Steine, Altholz, Strauchschnitt und Laub liegen bleiben. Brennnessel, Löwenzahn oder Giersch werden geduldet.',
        tip: 'Überlass eine Ecke sich selbst und lass Laub, Altholz und Wildkräuter dort stehen und liegen.',
      },
      {
        id: 'wildkraut',
        title: 'Wildkraut zulassen',
        partial: 'Vereinzelte Wildkräuter in Rasen, Fugen und Beeten oder ein Ansatz von Wildblumensaum',
        full: 'Naturrasen mit mindestens 5 Kräutern oder Wildblumensaum mit Selbstaussaat, Bewuchs in Fugen wird geduldet',
        hint: 'Typisch sind Gänseblümchen, Schafgarbe, Kriechender Günsel, Wegerich und Klee.',
        tip: 'Lass Kräuter wie Gänseblümchen, Klee und Wegerich im Rasen stehen und dulde Bewuchs in den Fugen.',
      },
    ],
  },
  {
    id: 'nutzgarten',
    title: 'Bewirtschaftung & Nutzgarten',
    intro: 'Wie gehst du mit deinem Garten um?',
    criteria: [
      {
        id: 'gemuese',
        title: 'Gemüsebeet und Kräuter',
        partial: 'Einzelne Gemüsepflanzen oder Kräuter für die Küche',
        full: 'Ein ausgeprägter Gemüse- oder Kräutergarten für die eigene Küche',
        tip: 'Starte mit einem kleinen Kräuterbeet oder einigen Gemüsepflanzen für die Küche.',
      },
      {
        id: 'kompost',
        title: 'Kompostierung',
        partial: 'Pflanzenabfälle werden gesammelt, aber nur teilweise weiterverwertet',
        full: 'Komposthaufen oder Schnellkomposter, der Kompost wird im Garten genutzt, und der Boden wird untersucht',
        hint: 'Empfohlen wird eine Bodenuntersuchung spätestens alle fünf Jahre.',
        tip: 'Nutze den reifen Kompost im Garten und lass den Boden untersuchen, damit du nicht überdüngst.',
      },
      {
        id: 'boden',
        title: 'Naturnahe Bodenpflege',
        partial: 'Zwei der vier Methoden: Mischkultur, Fruchtfolge, Gründüngung, Mulchen',
        full: 'Drei oder alle vier dieser Methoden',
        tip: 'Nimm eine weitere Methode dazu, zum Beispiel Mulchen oder eine Gründüngung leerer Beete über den Winter.',
      },
      {
        id: 'nuetzlinge',
        title: 'Nützlingsunterkünfte',
        partial: 'Wenige einzelne Unterkünfte',
        full: 'Verschiedene natürliche oder gebaute Unterkünfte, dauerhaft vorhanden',
        hint: 'Nur vorübergehend gelagerte Schnitt- oder Steinhaufen zählen nicht.',
        tip: 'Häng Nistkästen auf oder lass dauerhaft Reisig-, Laub- und Steinhaufen liegen.',
        blockedTip: 'Verzichte auf Laubsauger und Mähroboter. Sonst zählt dieses Kriterium gar nicht, egal wie viele Unterkünfte du hast.',
      },
      {
        id: 'obst',
        title: 'Obstgarten und Beerensträucher',
        partial: 'Ein Obstbaum, ein Wandspalier oder wenige Beerensträucher',
        full: 'Mehrere Obstbäume oder Beerensträucher, deren Früchte genutzt werden',
        tip: 'Pflanze zusätzliche Beerensträucher. Sie passen auch in kleine Gärten.',
      },
      {
        id: 'regen',
        title: 'Regenwassernutzung und sparsame Bewässerung',
        partial: 'Regenwasser nur in Teilbereichen, geringes Volumen, etwa eine 100-Liter-Tonne',
        full: 'Regenwasser für Bereiche mit hohem Wasserbedarf, großer Speicher, standortgerechte Pflanzen und gemulchte Beete',
        tip: 'Vergrößere den Regenwasserspeicher und mulche die Beete, die viel Wasser brauchen.',
      },
      {
        id: 'material',
        title: 'Ressourcenschonende Materialwahl',
        partial: 'Ein umweltfreundliches Material, ohne Hochdruckimprägnierung und Plastik',
        full: 'Mehrere umweltfreundliche Materialien, wenig Versiegelung, keine imprägnierten Hölzer, kein Plastik, keine Lichtverschmutzung',
        hint: 'Gemeint sind regionaltypische Steine und Hölzer oder umweltfreundliche Altmaterialien. Zäune sollten über dem Boden abschließen, damit Tiere durchschlüpfen können.',
        tip: 'Nimm regionaltypische Steine und Hölzer, halte Wege wasserdurchlässig und lass Zäune unten frei für Igel und Co.',
      },
    ],
  },
]

export const BLOWER_CONDITION_CRITERION = 'nuetzlinge'

export const allRatedCriteria = categories.flatMap((category) => category.criteria)
