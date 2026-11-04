import { defineStore } from 'pinia'
import { computed } from 'vue'
import { modules } from '../modules/index.js'
import { exportFileName, parseImport, serializeExport } from './storage.js'

// Export, Import und Löschen über alle Module hinweg.
export const useDataStore = defineStore('data', () => {
  const stores = () => modules.map((module) => ({ module, store: module.useStore() }))

  const saved = computed(() => stores().every(({ store }) => store.saved))

  function exportFile() {
    const data = Object.fromEntries(stores().map(({ module, store }) => [module.id, store.answers]))
    const label = stores().map(({ module, store }) => module.exportLabel?.(store)).find(Boolean)
    return { text: serializeExport(data), name: exportFileName(label) }
  }

  function importText(text) {
    const data = parseImport(text)
    for (const { module, store } of stores()) {
      if (data[module.id]) store.replace(data[module.id])
    }
  }

  function resetAll() {
    stores().forEach(({ store }) => store.reset())
  }

  return { saved, exportFile, importText, resetAll }
})
