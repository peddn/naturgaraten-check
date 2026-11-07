# Vogelfreundlicher Garten (Vorprüfung)

Modul: `src/modules/vogelgarten` · Gebiet: Bayern

## Quellen

| Kürzel | Dokument | Stand |
| --- | --- | --- |
| Q1 | [Anmeldeseite mit FAQ (LBV)](https://www.lbv.de/mitmachen/fuer-einsteiger/projekt-vogelfreundlicher-garten/garten-bewerten-lassen/) | abgerufen 11/2026 |
| Q2 | [Faltblatt „Vogelfreundlicher Garten“ (LfU)](https://www.lfu.bayern.de/publikationen/get_pdf.htm?art_nr=lfu_nat_00399) | undatiert |
| Q3 | [Projektseite (LfU)](https://www.lfu.bayern.de/natur/bayaz/gartenvielfalt/vogelfreundlicher_garten/index.htm) | abgerufen 11/2026 |

## Vorgaben und Umsetzung

| Offizielle Vorgabe | Quelle | Umsetzung |
| --- | --- | --- |
| Mindestens 2 von 4 Musskriterien: Insektenvielfalt, Früchte/Beeren/Samen, Nistmaterial, wilde Ecke | Q1, Q2 | `mustCriteria`, `REQUIRED_MUST = 2` |
| Kein Ausschlusskriterium: Pestizide, Mähroboter, Laubsauger/-bläser, unnötige neue Versiegelung, Unkrautvlies mit Kies auf Pflanzflächen, flächiger Rindenmulch oder Hackschnitzel | Q1, Q2 | `exclusionCriteria`. Ein Ja ergibt sofort `excluded`. |
| Zu Pestiziden zählen auch Leimringe, Pheromonfallen und Bacillus thuringiensis | Q1, FAQ | Hinweistext und Vergleich mit „Bayern blüht – Naturgarten“ |
| Geräte sind auch tagsüber oder auf Teilflächen ausgeschlossen | Q1, FAQ | Hinweistext |
| Vlies und Mulch sind auf Wegen, Sitz- und Spielplätzen und als Gießring erlaubt | Q1, FAQ | Hinweistexte |
| Eine ehrenamtliche Jury bewertet vor Ort nach einem Kriterienkatalog | Q1, Q3 | Ergebnis lautet „Du kannst dich anmelden“, nicht „Plakette erreicht“ |
| Die Jury achtet auf Nahrung, Deckung, Nistmöglichkeiten, heimische Pflanzen, Samenstände, Gehölze mit Früchten, Futter- und Wasserstellen | Q2 | Liste `juryFocus`, ohne Bewertung |
| Neue Anmeldungen gelten für die Saison 2027 | Q1 | Hinweistext |

## Auslegungen

- **Nur Vorprüfung:** Der vollständige Katalog der Jury war nicht einsehbar. Die App prüft deshalb nur, was bei der Anmeldung bestätigt wird.

## Eigene Ergänzungen

- **Gartenbild:** Für jedes erfüllte Musskriterium erscheint ein Vogel, bei einem Ausschlusskriterium verschwinden alle.
