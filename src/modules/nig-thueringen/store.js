import { createCheckStore } from '../../shared/createCheckStore.js'
import { createEmptyState, evaluate, sanitizeState, summarize } from './scoring.js'

export const useNigThueringenStore = createCheckStore({
  id: 'nig-thueringen',
  createEmpty: createEmptyState,
  sanitize: sanitizeState,
  evaluate,
  summarize,
})
