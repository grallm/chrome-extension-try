import { QuestionSolution } from '../types'

/**
 * Save answer to storage
 */
export function saveAnswStore (questionId: string, serieId: string) {
  chrome.storage.sync.get('stychAnsw', async function (data) {
    try {
      const answ: QuestionSolution[] = data.stychAnsw ?? []

      // Add if not exists
      const entryExists = answ.find((a) => a.questionId === questionId && a.serieId === serieId)
      if (!entryExists) {
        answ.push({
          serieId,
          questionId,
          date: Date.now()
        })
      }

      chrome.storage.sync.set({ stychAnsw: answ })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
}
/**
 * Remove answer from storage
 */
export function removeAnswStore (questionId: string, serieId: string) {
  chrome.storage.sync.get('stychAnsw', async function (data) {
    try {
      const answ: QuestionSolution[] = data.stychAnsw ?? []

      // Remove corresponding entry
      const newAnsw = answ.filter((a) => a.questionId !== questionId || a.serieId !== serieId)

      chrome.storage.sync.set({ stychAnsw: newAnsw })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
}
