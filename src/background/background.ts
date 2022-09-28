import stychContentDb from '../../public/data/stych-content.json'
import { Message, MessageRemoveAnswer, MessageSaveAnswer, MessageSearchText, MessageTypes, PageEntry } from '../types'
import { Document } from 'flexsearch'
import { addRemoveBtnAndScroll, addSaveAnswerBtn } from '../dom/answer-save'
import { removeAnswStore, saveAnswStore } from './answ-save-storage'

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
  // eslint-disable-next-line no-console
  console.info(`Added ${stychContentDb.length} Stych entries`)
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
    case MessageTypes.REMOVE_ANSWER:
      removeAnswStore((message as MessageRemoveAnswer).questionId, (message as MessageRemoveAnswer).serieId)
      break
    default:
      sendResponse('error')
  }
})

// Add save answer button when correct URL loads
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    // Check if correct tab and URL
    chrome.tabs.get(tabId, async function (tab) {
      if (tab.id && tab.url) {
        // Execute function depending on URL
        let funcToExec

        // Add remove button
        if (tab.url.includes('application.prepacode-enpc.fr/series/')) {
          funcToExec = addRemoveBtnAndScroll
        } else if (tab.url.includes('application.prepacode-enpc.fr/player?seriesId=')) {
          // Add save answer button
          funcToExec = addSaveAnswerBtn
        }

        // Execute script in page
        if (funcToExec) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: funcToExec
          })
        }
      }
    })
  }
})
