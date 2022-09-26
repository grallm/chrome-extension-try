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

/**
 * Load saved answers
 */
const loadAnswers = async () => {
  const answers = (await chrome.storage.sync.get('stychAnsw')).stychAnsw as QuestionSolution[] | undefined
  const answersContainer = document.querySelector('#answersContainer')

  if (answersContainer && answers) {
    // const answersHtml = (answers as QuestionSolution[]).map(({ title, link }) => `<li><a target="_blank" href="${link}">${title}</a></li>`)
    // answersContainer.innerHTML = answersHtml.join('')
    answersContainer.innerHTML = `${answers.length} saved answers <span style="font-size: 16px;">➜</span>`

    // Add opening effects
    let answOpen = false
    answersContainer.addEventListener('click', () => {
      answOpen = !answOpen

      if (answOpen) {
        answersContainer.classList.add('rotate-90')
        answersContainer.classList.remove('rotate-0')
      } else {
        answersContainer.classList.add('rotate-0')
        answersContainer.classList.remove('rotate-90')
      }
    })
  }
}
loadAnswers()
