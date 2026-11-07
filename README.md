# Garten-Check

Selbstchecks für ökologische Gartenauszeichnungen. Jede Zertifizierung ist ein eigenes Modul
mit eigenen Kriterien, eigener Bewertung, eigenem Pinia-Store und eigenen Routen.

Das ist kein offizielles Angebot. Die Checks ersetzen keine Bewertung vor Ort.

## Module

Wer die App öffnet, wählt zuerst sein Bundesland und sieht dann die Angebote für dieses Land und
die bundesweiten Angebote. Gibt es für ein Land kein eigenes Angebot, erscheint ein Hinweis.

Welche Module es gibt, für welche Länder sie gelten und nach welchen offiziellen Unterlagen sie
gebaut sind, steht in [`docs/module/`](docs/module/).

## Aufbau

```
src/
  modules/
    index.js          Bindet alle Modulordner automatisch ein
    <modul>/
      index.js        Titel, Gebiete, Routen, Store
      criteria.js     Kriterien
      scoring.js      Bewertung, per Vitest getestet
      store.js        Pinia-Store mit answers, result und summary
      *View.vue       Oberfläche
  shared/
    engines/          Gemeinsame Bewertungsmuster: Stufen, Zählen, Vorprüfung
    regions.js        Bundesländer und Zuordnung der Module
    ...               Speicherung, Datenexport, Layout, Zeichnungen
  router/             Hash-Routing
  views/              Landesauswahl und Angebote eines Landes
docs/module/          Quellen und Umsetzung je Modul
```

### Neues Modul

1. Ordner unter `src/modules/` mit `index.js` anlegen. Er wird automatisch eingebunden.
2. In `index.js` die Gebiete angeben: `regions: ['BW']` für ein Land, `['DE']` für bundesweit.
   Lokale Angebote nennen den Ort in `regionNote`.
3. Bewertung möglichst mit einem Muster aus `src/shared/engines/` umsetzen.
   `createCheckStore` erzeugt dazu den Pinia-Store.
4. Dokumentation unter `docs/module/<id>.md` anlegen.

Jeder Store stellt `answers`, `saved`, `replace`, `reset` und `summary` bereit.

| Muster | Regel | Genutzt von |
| --- | --- | --- |
| `tiered` (Stufen) | Kernkriterien und Kategorien mit 0 bis 2 Punkten je Kriterium, Mindestpunkte je Kategorie | Naturgarten |
| `count` (Zählen) | Pflichtkriterien und mindestens N erfüllte Kriterien | |
| `precheck` (Vorprüfung) | Mindestzahl an Musskriterien, keine Ausschlusskriterien | Vogelgarten |

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
