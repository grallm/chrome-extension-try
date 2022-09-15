import stychContentDb from '../public/data/stych-content.json'
import { Message, MessageSearchText, MessageTypes, PageEntry } from './types'
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
    default:
      sendResponse('error')
  }
})
