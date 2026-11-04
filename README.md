# Garten-Check

Selbstchecks für ökologische Gartenauszeichnungen. Jede Zertifizierung ist ein eigenes Modul
mit eigenen Kriterien, eigener Bewertung, eigenem Pinia-Store und eigenen Routen.

Das ist kein offizielles Angebot. Die Checks ersetzen keine Bewertung vor Ort.

## Module

| Modul | Route | Was es prüft | Grundlage |
| --- | --- | --- | --- |
| `naturgarten` | `#/naturgarten` | „Bayern blüht – Naturgarten“: 4 Kernkriterien und je Kategorie mindestens 7 Smileys | Bogen 2019, Kriterien März 2023 |
| `vogelgarten` | `#/vogelgarten` | Vorprüfung „Vogelfreundlicher Garten“: 2 von 4 Muss-, keine Ausschlusskriterien | LBV-Anmeldeseite, LfU-Faltblatt |
| `praemierung` | `#/praemierung` | Naturgartenprämierung, früher „Tausende Gärten – Tausende Arten“: Bronze und Grüne Oase | Aktueller Quick-Check von NaturGarten e.V. |

Grenzen, die aus den Quellen folgen:

- Der Kriterienkatalog des Vogelfreundlichen Gartens ist nicht öffentlich. Das Modul prüft nur die Anmeldung.
- Die Bewertungsmatrix der Prämierung ist unveröffentlicht. Silber und Gold werden nicht berechnet,
  die Grüne Oase gilt nur als möglich.
- Die Kann-Kriterien der Grünen Oase sind nicht veröffentlicht. Für sie gilt höchstens eine Ausnahme.

## Aufbau

```
src/
  modules/
    index.js          Liste aller Module
    <modul>/
      index.js        Beschreibung, Routen, Store
      criteria.js     Kriterien
      scoring.js      Bewertung ohne Vue, per Vitest getestet
      store.js        Pinia-Store mit answers, result und summary
      *View.vue       Oberfläche
  shared/             Speicherung, Datenexport, Layout, Zeichnungen
  router/             Hash-Routing aus der Modulliste
  views/              Startseite
```

Für eine neue Zertifizierung legst du einen Ordner unter `src/modules/` an und trägst ihn in
`src/modules/index.js` ein. Startseite, Navigation, Router und Datenexport nutzen diese Liste.

Der Store muss `answers`, `saved`, `replace`, `reset` und `summary` bereitstellen.
`usePersistedAnswers` liefert davon alles außer `summary`.

## Technik

Vue 3, Vue Router, Pinia, Vite und Tailwind CSS 4, keine Datenbank und kein Server. Die Antworten
liegen im `localStorage`. Der Export bündelt alle Module in einer JSON-Datei, Dateien der ersten
Version lassen sich weiter importieren. Die Schriften werden mit ausgeliefert.

```sh
npm install
npm run dev      # Entwicklungsserver
npm test         # Tests
npm run build    # Statischer Build in dist/
```

Relative Pfade und Hash-Routing erlauben jedes statische Hosting.
