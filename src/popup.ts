// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const changeColor = document.getElementById('changeColor')!

interface PageEntry {
  id: string
  title: string,
  link: string,
  parent: string
}

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
})

/**
 * Get all page children from a tab
 */
const getPagesFromTab = (): PageEntry[] => {
  const root: PageEntry[] = []
  document.querySelectorAll('#sheets .item-title').forEach(e => {
    if (e) {
      root.push({
        id: e.textContent?.trim() || '',
        title: e.textContent?.trim() || '',
        link: (e as HTMLAnchorElement).href,
        parent: ''
      })
    }
  })
  console.log('root')
  return root
}
