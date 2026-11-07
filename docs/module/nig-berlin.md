# Natur im Garten Berlin

Modul: `src/modules/nig-berlin` · Gebiet: Berlin

## Quellen

| Kürzel | Dokument | Stand |
| --- | --- | --- |
| Q1 | „Natur im Garten“ Kriterien, ausformuliert (Berlin), als PDF bereitgestellt | erstellt am 27.03.2025 laut Dateieigenschaften |
| Q2 | [Natur im Garten Berlin](https://www.naturimgarten.berlin/) | abgerufen 11/2026 |

## Vorgaben und Umsetzung

| Offizielle Vorgabe | Fundstelle in Q1 | Umsetzung |
| --- | --- | --- |
| Alle Kernkriterien müssen erfüllt sein: Verzicht auf chemisch-synthetische Pestizide, auf chemisch-synthetische Dünger, auf Torf | 1. Kernkriterien | `core`, Muster `count` |
| Biokonforme Mittel nach EU-Bio-Verordnung oder Gütesiegel nur als letzte Maßnahme; organische Fertigdünger falls nötig; kein Torf auch bei Topfpflanzen und Erden | 1. Kernkriterien | Hinweistexte |
| Zwei grundsätzliche Kriterien müssen erfüllt sein: heimisches, ökologisch wertvolles, standortgerechtes Grundgerüst; Großteil der Fläche nicht versiegelt | 2. | `basics` |
| Mindestens 7 weitere Kriterien aus 2a, 2b und 2c insgesamt | 2. | `REQUIRED = 7`, `evaluateCount` zählt alle Bereiche zusammen |
| 2a Naturgartenelemente und naturnahe Bepflanzung: 8 Kriterien | 2 a | `groups[0]` |
| 2b Ökologische Bewirtschaftung: 9 Kriterien, darunter „Kein Streusalz“ und „Umweltfreundliches Material“ bei Spielgeräten | 2 b | `groups[1]` |
| 2c Maßnahmen zur Klimawandelanpassung: 6 Kriterien | 2 c | `groups[2]` |
| Bonuspunkte: keine Lichtverschmutzung, nahezu plastikfrei, tierschonende Pflege | Zusätzliche Anmerkungen | Nur als Liste, ohne Bewertung |
| Begehung vor Ort, Anmeldung und Termine | Q2 | Hinweistext mit Link |

## Auslegungen

- **Erfüllt oder nicht:** Q1 beschreibt die Kriterien als Ziel, ohne Stufen wie * und **. Die App fragt deshalb nur „vorhanden“ ab. Wie streng die Prüfer einzelne Kriterien auslegen, ist offen.
- **Bonuspunkte:** Q1 sagt nicht ausdrücklich, dass sie nicht zu den 7 Kriterien zählen. Weil sie getrennt unter „Zusätzliche Anmerkungen – Bonuspunkte“ stehen, zählt die App sie nicht mit.
- **Kosten:** Q1 und Q2 nennen keine Beträge. Die App verweist auf die Anmeldung.

## Eigene Ergänzungen

- **Gartenbild:** Pflanzen für die Bereiche 2a und 2b, am Haus Dach- und Fassadenbegrünung, Regentonne, Klimabaum und Pflaster für 2c. Die Sonne zeigt die fünf Pflichtkriterien.
