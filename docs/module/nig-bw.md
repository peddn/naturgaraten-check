# Natur im Garten Baden-Württemberg

Modul: `src/modules/nig-bw` · Gebiet: Baden-Württemberg

## Quellen

| Kürzel | Dokument | Stand |
| --- | --- | --- |
| Q1 | „Bewertungskriterien Plakettenvergabe NATUR im GARTEN“, Interessentenblatt des Landesverbands der Gartenfreunde Baden-Württemberg e.V., als PDF bereitgestellt | 08.08.2023 laut Dateiname |

## Vorgaben und Umsetzung

| Offizielle Vorgabe | Fundstelle in Q1 | Umsetzung |
| --- | --- | --- |
| Kernkriterien müssen alle erfüllt sein: Verzicht auf chemisch-synthetische Pestizide, auf chemisch-synthetische Dünger und auf Torf | Kernkriterien | `core` in `criteria.js`, Muster `tiered` |
| Erlaubt sind nur Pestizide nach EU-Bioverordnung und „Natur im Garten“-Gütesiegel | Kernkriterien | Hinweistext |
| Jedes Kriterium „ansatzweise erfüllt“ (*) oder „zur Gänze erfüllt“ (**), jedes * zählt | Weitere Kriterien | Bewertung 0, 1 oder 2 Sterne, Beschriftung „Ansatzweise“ und „Zur Gänze“ |
| Naturgartenelemente: 8 Kriterien, mindestens 7 Punkte | Naturgartenelemente | `categories[0]`, `required: 7` |
| Ökologische Bewirtschaftung: 8 Kriterien, mindestens 5 Punkte | Ökologische Bewirtschaftung | `categories[1]`, `required: 5` |
| Beschreibungen für * und ** je Kriterium | je Kriterium | `partial` und `full`, gekürzt |
| Hinweise für kleine Gärten: Solitärsträucher, Kletterpflanzen statt Bäumen, Wurmbox oder Bokashi | Wildgehölze, Bäume, Kompost | `hint` je Kriterium |
| Kleingartenparzellen: Bäume nicht anwendbar; Hinweise zu Hecken, Feuchtbiotopen und Obstbäumen | Hinweise mit ▷ | Schalter „Kleingartenparzelle“, `isBlocked` für Bäume, `allotmentNote` je Kriterium |
| Bonuspunkte zählen nicht zu den Pflichtpunkten | Zusätzliche Anmerkungen | Nur als Liste im Ergebnis, ohne Bewertung |
| Plakette nach einmaliger Begehung, eine Momentaufnahme; bei Nichterfüllung abnehmen | Vertrauen gegen Vertrauen | Hinweistext |
| Kosten für Zertifizierung, Plakette, Urkunde und Fahrt, Mitglieder ermäßigt | Kosten | Allgemeiner Hinweis ohne Beträge |

## Auslegungen

- **Bäume, * und **:** Q1 beschreibt * als „ein Baum“ und ** als „ein oder mehrere“ Bäume. Die Abgrenzung ist nicht eindeutig. Die App übernimmt beide Texte unverändert.
- **Kleingarten ohne Bäume:** Q1 nennt das Kriterium „nicht anwendbar“, aber keine geringere Mindestzahl. Die App zählt es mit 0 Sternen, die Mindestzahl bleibt 7.
- **Schau- und Lehrgärten:** Bonuspunkte für Sanitäranlagen und Beschilderung sowie die Kosten für Gärten mit Eintritt betreffen keine Privatgärten und fehlen in der App.

## Eigene Ergänzungen

- **Gartenbild:** Jedes Kriterium hat eine Pflanze oder ein Element, die Sonne zeigt die drei Kernkriterien.
- **Vorschläge:** Die App wählt die Kriterien, die mit den wenigsten Schritten zur Mindestzahl führen.
