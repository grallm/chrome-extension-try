// Initialize button with user's preferred color
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const changeColor = document.getElementById('changeColor')!

chrome.storage.sync.get('color', ({ color }) => {
  changeColor.style.backgroundColor = color
})

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  // console.log(tab)

  chrome.scripting.executeScript({
    target: { tabId: tab.id as any },
    func: setPageBackgroundColor
  })
})

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor () {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
}
