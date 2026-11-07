# Naturgartenprämierung

Modul: `src/modules/praemierung` · Gebiet: bundesweit

## Quellen

| Kürzel | Dokument | Stand |
| --- | --- | --- |
| Q1 | Quick-Check für die Prämierung (NaturGarten e.V.), über die Vereinsseite verlinkt, als PDF bereitgestellt | undatiert, verwendet 11/2026 |
| Q2 | [Naturgartenprämierung (NaturGarten e.V.)](https://naturgarten.org/naturgartenpraemierung/) | abgerufen 11/2026 |
| Q3 | [Quick-Check „Tausende Gärten – Tausende Arten“](https://www.tausende-gaerten.de/media/tgta-infoblatt-quick-check-praemierung-23-02-23.pdf) | 23.02.2023, Vorgänger von Q1 |

## Vorgaben und Umsetzung

| Offizielle Vorgabe | Quelle | Umsetzung |
| --- | --- | --- |
| Bronze: alle Mindestkriterien vollumfänglich erfüllt | Q1 | Status `bronze` in `evaluate` |
| Heimische Wildpflanzen auf mindestens 50 % der Fläche, Nutzpflanzen ausgenommen, Dachbegrünung zählt mit | Q1 | `nativeCriterion`, Antwort „Heimische Wildpflanzen“ |
| Keine invasiven Neophyten | Q1 | `countCriteria.neophytes`, nur „Keine“ erfüllt Bronze |
| Tierwohl: keine Tierfallen, möglichst wenig künstliches Licht | Q1 | `strictCriteria.animals` |
| Keine Steine aus Übersee, kein Tropenholz, kein chemisch behandeltes Holz | Q1 | `countCriteria.overseas` und `treatedWood` |
| Kein Torf, keine Pestizide, kein Kunstdünger | Q1 | `strictCriteria` |
| Mindestens zwei Klein-Biotopelemente, z. B. Totholz, Sandfläche, Teich, Blumenwiese | Q1 | `biotopes`, `REQUIRED_BIOTOPES = 2` |
| Silber und Gold: mehr Punkte für höhere Qualität | Q1 | Nicht berechnet, nur Liste `testerFocus` aus Q2 |
| Grüne Oase: heimische Pflanzen auf 50 %, Tierwohl, kein Torf, keine Pestizide, kein Kunstdünger, zwei Biotopelemente | Q1 | Status `oasis` |
| Grüne Oase: höchstens ein Baustoff aus Übersee oder Raubbau oder ein chemisch behandeltes Element oder höchstens zwei invasive Neophyten | Q1 | `limit` je Kriterium in `countCriteria` |
| Grüne Oase: besonders gute Bewertung bei den Kann-Kriterien | Q1 | Nicht prüfbar, die Oase heißt deshalb „möglich“ |
| Bewerbung online, Besichtigung durch Tester | Q2 | Hinweistext |

## Auslegungen

- **„oder“ bei den Ausnahmen der Grünen Oase:** Gelesen als höchstens eine Ausnahme. Mehrere ergeben „zu viele Ausnahmen“.
- **„Heimische Pflanzen“ bei der Grünen Oase:** Gelesen als bewusster Unterschied zu den Wildpflanzen bei Bronze.
- **Biotopelemente:** Q1 nennt nur Beispiele. Die App ergänzt Trockenmauer und Nisthilfen aus der Einleitung von Q1 sowie Steinhaufen aus Q2.
- **Tester:** Die Bundesförderung von „Tausende Gärten“ war bis 11/2025 angelegt. Die App rät, vorher die Verfügbarkeit zu erfragen.
- **Kosten:** Die Vereinsseiten nennen unterschiedliche Beträge. Die App gibt nur einen allgemeinen Hinweis.

## Eigene Ergänzungen

- **Gartenbild:** Jedes Biotopelement erscheint im Bild, die Medaille zeigt Bronze oder Grüne Oase.
