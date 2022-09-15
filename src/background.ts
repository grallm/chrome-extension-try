import stychContentDb from '../public/data/stych-content.json'
import { Message, MessageTypes } from './types'

chrome.runtime.onInstalled.addListener(() => {
  console.log(`Added ${stychContentDb.length} Stych categories`)
})

// Receiving messages from popup
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  switch (message.type) {
    case MessageTypes.SEARCH_TEXT:
      sendResponse('result')
      break
    case MessageTypes.GET_NUMBER_ENTRIES:
      sendResponse(stychContentDb.length)
      break
    default:
      sendResponse('error')
  }
})
