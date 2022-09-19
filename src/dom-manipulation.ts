import { PageEntry } from './types'

/**
 * Get all page children from a tab
 */
export const getPagesFromTab = (): PageEntry[] => {
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
        const urlElem = e.nodeName === 'DIV' ? (e as HTMLDivElement).querySelector('a') : e as HTMLAnchorElement
        const pageId = urlElem?.href.split('/').slice(-2).join('/')

        // If parent course page, no parent
        const course: PageEntry = {
          id: pageId || '',
          title: e.textContent?.trim() || '',
          link: urlElem?.href || '',
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
