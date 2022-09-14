import { chunkedWrite } from './utils/ChromeSyncChunks.utils'
import stychContentDb from '../public/data/stych-content.json'

chrome.runtime.onInstalled.addListener(() => {
  chunkedWrite('stychContent', stychContentDb)

  console.log(`Added ${stychContentDb.length} Stych categories`)
})
