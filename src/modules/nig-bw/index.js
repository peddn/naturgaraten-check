import NigBwView from './NigBwView.vue'
import { useNigBwStore } from './store.js'

export default {
  id: 'nig-bw',
  title: 'Natur im Garten Baden-Württemberg',
  description: 'Plakette für naturnahe Gärten. Drei Kernkriterien, dazu mindestens 7 Sterne bei den Naturgartenelementen und 5 bei der Bewirtschaftung.',
  regions: ['BW'],
  regionNote: 'Auch für Kleingärten',
  icon: 'hedgehog',
  order: 10,
  path: '/nig-bw',
  routes: [{ path: '/nig-bw/:step?', component: NigBwView }],
  useStore: useNigBwStore,
}
