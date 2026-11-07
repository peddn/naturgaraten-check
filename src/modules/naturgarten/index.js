import NaturgartenView from './NaturgartenView.vue'
import { useNaturgartenStore } from './store.js'

export default {
  id: 'naturgarten',
  navLabel: 'Naturgarten',
  title: 'Bayern blüht – Naturgarten',
  description: 'Plakette für Gärten in Bayern. Alle Grundregeln erfüllen und je Bereich mindestens 7 Smileys holen.',
  regions: ['BY'],
  regionNote: 'Je nach Landkreis',
  icon: 'leaf',
  order: 10,
  path: '/naturgarten',
  routes: [{ path: '/naturgarten/:step?', component: NaturgartenView }],
  useStore: useNaturgartenStore,
  exportLabel: (store) => store.answers.gardenName,
}
