import stychContentDb from '../public/data/stych-content.json'
import { Message, MessageSearchText, MessageTypes } from './types'
import { Document } from 'flexsearch'

// Init text search index
const index = new Document({
  document: {
    id: 'id',
    index: 'title',
    store: true
  }
})
for (const page of stychContentDb) {
  index.add(page)
}

chrome.runtime.onInstalled.addListener(() => {
  console.log(`Added ${stychContentDb.length} Stych categories`)
})

// Receiving messages from popup
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  console.log('message', message)
  switch (message.type) {
    case MessageTypes.SEARCH_TEXT:
      sendResponse(index.search(
        (message as MessageSearchText).text,
        { limit: 10, enrich: true }
      ))
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
