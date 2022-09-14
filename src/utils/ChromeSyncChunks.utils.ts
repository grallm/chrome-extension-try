/**
 * Split an object into chunks into Chrome sync storage
 */
export function chunkedWrite (key: string, value: object) {
  return new Promise(resolve => {
    if (typeof key !== 'string') key = `${key}`
    const str = JSON.stringify(value) // consider using LZString's compressToUTF16
    const len = chrome.storage.sync.QUOTA_BYTES_PER_ITEM - key.length - 1000
    const num = Math.ceil(str.length / len)
    const obj: { [key: string]: string | number } = {}
    obj[key + '#'] = num
    for (let i = 0; i < num; i++) {
      obj[key + i] = str.substr(i * len, len)
    }
    chrome.storage.sync.set(obj, () => resolve('done'))
  })
}

/**
 * Merge splitted object from Chrome sync
 */
export function chunkedRead (key: string) {
  return new Promise(resolve => {
    if (typeof key !== 'string') key = `${key}`
    const keyNum = key + '#'
    chrome.storage.sync.get(keyNum, data => {
      const num = data[keyNum]
      const keys = []
      for (let i = 0; i < num; i++) {
        keys[i] = key + i
      }
      chrome.storage.sync.get(keys, data => {
        const chunks = []
        for (let i = 0; i < num; i++) {
          chunks.push(data[key + i] || '')
        }
        const str = chunks.join('')
        resolve(str ? JSON.parse(str) : undefined)
      })
    })
  })
}
