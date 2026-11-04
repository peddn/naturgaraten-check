# Naturgarten-Check

Selbstcheck für Gartenbesitzer: Wie nah ist der eigene Garten an der Plakette
„Bayern blüht – Naturgarten“? Mit jeder Antwort wächst ein Gartenbild mit.

Das ist kein offizielles Angebot und ersetzt keine Zertifizierung. Die Entscheidung
treffen zwei Zertifizierer bei der Begehung vor Ort.

## Bewertung

- Alle 4 Kernkriterien müssen erfüllt sein.
- In beiden Kann-Kategorien sind mindestens 7 von 14 Smileys nötig.
  Ein Kriterium bringt 1 Smiley (teilweise) oder 2 Smileys (voll erfüllt).
- Wer Laubsauger oder Mähroboter nutzt, bekommt für Nützlingsunterkünfte keinen Smiley.

Grundlage sind der Zertifizierungsbogen (Stand 24.04.2019) und „Details zu den Kriterien“
(Stand März 2023). Die Texte stehen gekürzt in `src/data/criteria.js`.

## Technik

Vue 3, Vite und Tailwind CSS 4, keine Datenbank und kein Server. Die Antworten liegen im
`localStorage` des Browsers und lassen sich als JSON-Datei exportieren und importieren.
Die Schriften werden mit ausgeliefert, es gibt keine externen Anfragen.

```sh
npm install
npm run dev      # Entwicklungsserver
npm test         # Tests der Bewertungslogik und Speicherung
npm run build    # Statischer Build in dist/
```

Der Build nutzt relative Pfade und läuft daher auf jedem statischen Hosting.
