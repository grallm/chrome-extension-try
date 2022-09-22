import { addSaveAnswerBtn, getQuestionId } from '../dom/answer-save'
import { getPagesFromTab } from '../dom/stych-fetch'
import { Message, MessageSearchText, MessageTypes, PageEntry, QuestionSolution } from '../types'

// Add number of entries in popup
// Send message to background
const message: Message = {
  type: MessageTypes.GET_NUMBER_ENTRIES
}
chrome.runtime.sendMessage(message, function (response: number) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('#stychPagesCount')!.innerHTML = `${response} entries`
})

// Popup action buttons
const fetchContent = document.getElementById('fetchContent')
const openPages = document.getElementById('openPages')

// When the button is clicked, inject setPageBackgroundColor into current page
fetchContent?.addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({
    url: 'https://www.stych.fr/*'
  })

  // Loop all tabs and query pages
  const tabExecPromises: Promise<chrome.scripting.InjectionResult<PageEntry[]>[]>[] = []
  for (const tab of tabs) {
    if (tab.id) {
      tabExecPromises.push(chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getPagesFromTab
      }))
    }
  }

  // Extract only the result from the promise: page method results
  const result = (await Promise.all(tabExecPromises)).reduce((acc, tabResult) => {
    if (!tabResult[0].result) return acc
    return [...acc, ...tabResult[0].result]
  }, [] as PageEntry[])

  await navigator.clipboard.writeText(JSON.stringify(result))
  alert('Copied to clipboard')
})

// Open all pages in new tabs
openPages?.addEventListener('click', async () => {
  // Send message to background
  const message: Message = {
    type: MessageTypes.GET_ALL_ENTRIES
  }
  chrome.runtime.sendMessage(message, function (pages: PageEntry[]) {
    pages.forEach(page => chrome.tabs.create({ url: page.link }))
  })
})

// Search when input changes
const resultContainer = document.querySelector('#resultContainer')
document.querySelector('#searchInput')?.addEventListener('input', async (e) => {
  // Input text
  const text = (e.target as HTMLInputElement).value

  if (resultContainer) {
    if (text) {
      // Send message to background
      const message: MessageSearchText = {
        type: MessageTypes.SEARCH_TEXT,
        text
      }
      chrome.runtime.sendMessage(message, function (response: PageEntry[]) {
        const resultsHtml = response.map(({ title, link }) => `<li><a target="_blank" href="${link}">${title}</a></li>`)
        resultContainer.innerHTML = resultsHtml.join('')
      })
    } else {
      resultContainer.innerHTML = ''
    }
  }
})
// Block form submit
document.querySelector('#searchForm')?.addEventListener('submit', e => e.preventDefault())

document.querySelector('#saveAnswBtn')?.addEventListener('click', async () => {
  console.log('click')
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (tab.id) {
    const tabResult = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: addSaveAnswerBtn
    })

    if (tabResult[0].result) {
      const button = tabResult[0].result
      console.log('button', button)
      button.addEventListener('click', () => saveAnswStore(tab.id))
    }
  }
})

// Save answer to storage
function saveAnswStore (tabId: number | undefined) {
  console.log('save', tabId)
  if (!tabId) return

  chrome.storage.sync.get('stychAnsw', async function (data) {
    const serieId = new URLSearchParams(window.location.search).get('serieId') || ''

    const questionIdQuery = await chrome.scripting.executeScript({
      target: { tabId },
      func: getQuestionId
    })

    const questionId = questionIdQuery[0].result

    if (questionId && serieId) {
      const answ: QuestionSolution[] = [...data.stychAnsw, {
        serieId,
        questionId,
        date: Date.now()
      }]
      console.log(answ)
      chrome.storage.sync.set({ stychAnsw: answ })
    }
  })
}
