<script setup>
import { ref } from 'vue'
import { exportFileName, parseImport, serializeExport } from '../lib/storage.js'

const props = defineProps({
  state: { type: Object, required: true },
  saved: { type: Boolean, required: true },
})
const emit = defineEmits(['replace', 'reset'])

const fileInput = ref(null)
const message = ref('')
const isError = ref(false)
const confirmingReset = ref(false)

function say(text, error = false) {
  message.value = text
  isError.value = error
}

function exportJson() {
  const blob = new Blob([serializeExport(props.state)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = exportFileName(props.state)
  link.click()
  URL.revokeObjectURL(url)
  say('Datei exportiert.')
}

async function importJson(event) {
  const [file] = event.target.files
  event.target.value = ''
  if (!file) return
  try {
    emit('replace', parseImport(await file.text()))
    say('Datei importiert.')
  } catch (error) {
    say(error.message, true)
  }
}

function reset() {
  emit('reset')
  confirmingReset.value = false
  say('Alle Antworten gelöscht.')
}

const button =
  'rounded-full border-2 border-leaf/50 px-4 py-1 font-bold transition-colors hover:border-leaf hover:bg-paper'
</script>

<template>
  <section class="mt-14 border-t-2 border-lichen-deep pt-5" aria-labelledby="data-title">
    <h2 id="data-title" class="font-bold">Deine Daten</h2>
    <p class="text-base text-fir-soft">
      <template v-if="saved">Deine Antworten bleiben nur in diesem Browser gespeichert.</template>
      <template v-else>Dieser Browser erlaubt kein Speichern. Exportiere deine Antworten, bevor du die Seite schließt.</template>
    </p>
    <div class="mt-3 flex flex-wrap gap-2">
      <button type="button" :class="button" @click="exportJson">Als Datei exportieren</button>
      <button type="button" :class="button" @click="fileInput.click()">Datei importieren</button>
      <input ref="fileInput" type="file" accept="application/json,.json" class="sr-only" tabindex="-1" aria-label="Datei importieren" @change="importJson" />
      <button v-if="!confirmingReset" type="button" :class="button" @click="confirmingReset = true">Alles löschen</button>
      <template v-else>
        <button type="button" class="rounded-full border-2 border-rosehip bg-rosehip px-4 py-1 font-bold text-paper" @click="reset">
          Antworten endgültig löschen
        </button>
        <button type="button" :class="button" @click="confirmingReset = false">Abbrechen</button>
      </template>
    </div>
    <p v-if="message" role="status" class="mt-2 text-base" :class="isError ? 'font-bold text-rosehip' : 'text-fir-soft'">
      {{ message }}
    </p>
  </section>
</template>
