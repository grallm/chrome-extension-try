import { Message, MessageSearchText, MessageTypes, PageEntry } from './types'

// Add number of entries in popup
// Send message to background
const message: Message = {
  type: MessageTypes.GET_NUMBER_ENTRIES
}
chrome.runtime.sendMessage(message, function (response: number) {
  console.log(message)
  console.log(response)
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

  console.log(result)
  await navigator.clipboard.writeText(JSON.stringify(result))
  alert('Copied to clipboard')
})

/**
 * Get all page children from a tab
 */
const getPagesFromTab = (): PageEntry[] => {
  const root: PageEntry[] = []

  // Fiche page, get sub titles
  console.log(window.location.pathname)
  if (window.location.pathname.includes('fiche-cours')) {
    document.querySelectorAll('h2').forEach(title => {
      if (title) {
        const parentId = window.location.pathname.split('/').slice(-2).join('/')

        // If parent course page, no parent
        const course: PageEntry = {
          id: title.textContent?.trim() || '',
          title: title.textContent?.trim() || '',
          link: window.location.href,
          parent: parentId
        }

        root.push(course)
      }
    })
  } else {
    document.querySelectorAll('#sheets .item-title').forEach(e => {
      if (e) {
        const parentId = window.location.pathname.split('/').slice(-2).join('/')
        const pageId = (e.nodeName === 'DIV' ? (e as HTMLDivElement).querySelector('a') : (e as HTMLAnchorElement))?.href.split('/').slice(-2).join('/')
        console.log(pageId)

        // If parent course page, no parent
        const course: PageEntry = {
          id: pageId || '',
          title: e.textContent?.trim() || '',
          link: (e as HTMLAnchorElement).href,
          parent: null
        }

        if (parentId !== '8/apprendre') {
          // If sub course page
          course.parent = parentId
        }

        root.push(course)
      }
    })
  }

  return root
}

// Open all pages in new tabs
openPages?.addEventListener('click', async () => {
  // for (const page of stychContent) {
  //   chrome.tabs.create({ url: page.link })
  // }
})

// Search when input changes
document.querySelector('#searchInput')?.addEventListener('input', async (e) => {
  // Input text
  const text = (e.target as HTMLInputElement).value

  if (text) {
    // Send message to background
    const message: MessageSearchText = {
      type: MessageTypes.SEARCH_TEXT,
      text
    }
    chrome.runtime.sendMessage(message, function (response) {
      console.log('response')
      console.log(response)
    })
  }
})
// Block form submit
document.querySelector('#searchForm')?.addEventListener('submit', e => e.preventDefault())
