import NigThueringenView from './NigThueringenView.vue'
import { useNigThueringenStore } from './store.js'

export default {
  id: 'nig-thueringen',
  title: 'Natur im Garten Thüringen',
  description: 'Plakette für naturnahe Gärten. Die Vorprüfung klärt die drei Kernkriterien und zeigt, welche Elemente du schon hast.',
  regions: ['TH'],
  icon: 'hedgehog',
  order: 10,
  path: '/nig-thueringen',
  routes: [{ path: '/nig-thueringen', component: NigThueringenView }],
  useStore: useNigThueringenStore,
}
