interface PageEntry {
  id: string
  title: string,
  link: string,
  parent: string | null
}

let stychContent: PageEntry[] = []

chrome.storage.sync.get('stychContentNbChunks', ({ stychContentNbChunks }) => {
  // Fetch and merge content chunks
  let stychContentStr = ''
  for (let i = 0; i < stychContentNbChunks; i++) {
    chrome.storage.sync.get(`stychContent_${i}`, ({ [`stychContent_${i}`]: chunk }) => {
      stychContentStr += chunk
    })
  }

  console.log('stychContentStr', stychContentStr)
  stychContent = JSON.parse(stychContentStr)
  console.log(stychContent)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('#stychPagesCount')!.innerHTML = JSON.parse(stychContentNbChunks as string).length
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const changeColor = document.getElementById('changeColor')!

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
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
        const pageId = (e as HTMLAnchorElement).href.split('/').slice(-2).join('/')

        // If parent course page, no parent
        const course: PageEntry = {
          id: pageId,
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
