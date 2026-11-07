# Bayern blüht – Naturgarten

Modul: `src/modules/naturgarten` · Gebiet: Bayern

## Quellen

| Kürzel | Dokument | Stand |
| --- | --- | --- |
| Q1 | [Zertifizierungsbogen (LWG)](https://www.lwg.bayern.de/mam/cms06/gartenakademie/dateien/zertifizierung_des_gartens-formblatt.pdf) | 24.04.2019 |
| Q2 | [Leitfaden „Die Kriterien eines Naturgartens“ (Landkreis Main-Spessart)](https://www.main-spessart.de/media/www.main-spessart.de/org/med_1456/16184_naturgartenzertifizierung_-_leitfaden_und_kriterien.pdf), inhaltsgleich: [Details zu den Kriterien (LRA Roth)](https://www.landratsamt-roth.de/uwao-api/web/files/bypath/Themen/Natur-%20und%20Klimaschutz/Kreisfachberatung/2025-Details-zu-den-Kriterien.pdf) | 03/2023 |
| Q3 | [Bewertungsbogen, barrierefrei (LWG)](https://www.lwg.bayern.de/mam/cms06/gartenakademie/dateien/bewertungsbogen_barrierefrei.pdf) | undatiert |
| Q4 | [Regelwerk zum Ablauf (LWG)](https://www.lwg.bayern.de/mam/cms06/gartenakademie/dateien/ablauf-gartenzertifizierung.pdf) | undatiert |

## Vorgaben und Umsetzung

| Offizielle Vorgabe | Quelle | Umsetzung |
| --- | --- | --- |
| 4 Kernkriterien, alle müssen erfüllt sein: kein chemischer Pflanzenschutz, kein chemisch-synthetischer Dünger, kein Torf, hohe ökologische Vielfalt | Q1, Q2, Q3 | `coreCriteria` und `overallCriterion` in `criteria.js`. Ein Nein ergibt in `evaluate` den Status `missing`. |
| Erlaubt sind Mittel aus Anhang I (Dünger) und Anhang II (Pflanzenschutz) der VO (EG) 889/2008 | Q2, Q3 | Hinweistexte der Kernkriterien |
| Gesamteindruck wird nach dem Rundgang beurteilt | Q2 | Eigener Schritt nach beiden Kategorien |
| Zwei Kategorien mit je 7 Kann-Kriterien | Q1, Q2, Q3 | `categories` in `criteria.js`, Titel wie in Q2 |
| ☺ = teilweise, ☺☺ = voll erfüllt, jeder Smiley zählt | Q2 | Bewertung 0, 1 oder 2 je Kriterium |
| Mindestens 7 ☺ in jeder Kategorie | Q1, Q2, Q3 | `REQUIRED_SMILEYS = 7`, `scoreCategory` je Kategorie, kein Ausgleich zwischen Kategorien |
| Stufenbeschreibungen je Kriterium | Q2, Abschnitt 2.1 und 2.2 | `partial` und `full` je Kriterium, gekürzt |
| Hinweise zu Grundstücksgröße, gefüllten Arten, Nadelgehölz, Forsythie, Trockenmauern, Bodenuntersuchung | Q2 | `hint` je Kriterium |
| Nützlingsunterkünfte: Verzicht auf Laubsauger und Mähroboter ist Teil der Kriterien für ☺ und ☺☺ | Q2, 2.2 d | `isBlocked`: Mit Laubsauger oder Mähroboter zählt das Kriterium 0 ☺. |
| Vorübergehend gelagerte Schnitt- oder Steinhaufen zählen nicht als Nützlingsunterkunft | Q2, 2.2 d | Hinweistext |
| Zwei Zertifizierer entscheiden vor Ort | Q4 | Ergebnis lautet „nach deiner Einschätzung“, Hinweis auf die Begehung |

## Auslegungen

- **Laubsauger und Mähroboter beim Gesamteindruck:** Q2 nennt den Verzicht als Grundsatz (1.4), bewertet ihn aber nur bei den Nützlingsunterkünften. Die App weist beim Gesamteindruck darauf hin, wertet dort aber nicht ab.
- **Kosten:** Die Quellen nennen widersprüchliche Beträge. Die App gibt nur einen allgemeinen Hinweis.

## Eigene Ergänzungen

- **Gartenbild:** Jede Pflanze steht für ein Kriterium, die Sonne für die Kernkriterien.
- **Vorschläge:** Die App wählt die Kriterien, die mit den wenigsten Schritten zu 7 ☺ führen.
- **Früherkennung:** Sind 7 ☺ nicht mehr erreichbar, zeigt die App das vor der letzten Antwort.
