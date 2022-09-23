import stychContentDb from '../public/data/stych-content.json'
import { Message, MessageSaveAnswer, MessageSearchText, MessageTypes, PageEntry, QuestionSolution } from './types'
import { Document } from 'flexsearch'

// Init text search index
const index = new Document<PageEntry, true>({
  document: {
    id: 'id',
    index: 'title',
    store: true
  },
  tokenize: 'full'
})
for (const page of stychContentDb) {
  index.add(page as PageEntry)
}

chrome.runtime.onInstalled.addListener(() => {
  console.log(`Added ${stychContentDb.length} Stych entries`)
})

// Receiving messages from popup
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  switch (message.type) {
    case MessageTypes.SEARCH_TEXT:
      // Search document
      // eslint-disable-next-line no-case-declarations
      const searchResult = index.search(
        (message as MessageSearchText).text,
        10,
        { limit: 10, enrich: true }
      )
      sendResponse(searchResult[0].result.map((page) => page.doc))
      break
    case MessageTypes.GET_NUMBER_ENTRIES:
      sendResponse(stychContentDb.length)
      break
    case MessageTypes.GET_ALL_ENTRIES:
      sendResponse(stychContentDb)
      break
    case MessageTypes.SAVE_ANSWER:
      saveAnswStore((message as MessageSaveAnswer).questionId, (message as MessageSaveAnswer).serieId)
      break
    default:
      sendResponse('error')
  }
})

// Save answer to storage
function saveAnswStore (questionId: string, serieId: string) {
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

      return 'success'
    } catch (e) {
      console.error(e)
      return 'error'
    }
  })
}
