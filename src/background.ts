const stychPages = [
  {
    id: '8/116',
    title: 'Règles de circulation',
    link: 'https://www.stych.fr/elearning/course/8/116',
    parent: null
  },
  {
    id: '8/117',
    title: 'Conducteur - conductrice',
    link: 'https://www.stych.fr/elearning/course/8/117',
    parent: null
  },
  {
    id: '8/118',
    title: 'Autres usagers',
    link: 'https://www.stych.fr/elearning/course/8/118',
    parent: null
  },
  {
    id: '8/120',
    title: 'Réglementation',
    link: 'https://www.stych.fr/elearning/course/8/120',
    parent: null
  },
  {
    id: '8/119',
    title: 'Circuler à moto',
    link: 'https://www.stych.fr/elearning/course/8/119',
    parent: null
  },
  {
    id: '8/121',
    title: 'Porter secours',
    link: 'https://www.stych.fr/elearning/course/8/121',
    parent: null
  },
  {
    id: '8/122',
    title: 'Élements mécaniques moto',
    link: 'https://www.stych.fr/elearning/course/8/122',
    parent: null
  },
  {
    id: '8/123',
    title: 'Protection et sécurité',
    link: 'https://www.stych.fr/elearning/course/8/123',
    parent: null
  },
  {
    id: '8/124',
    title: 'Éco-conduite',
    link: 'https://www.stych.fr/elearning/course/8/124',
    parent: null
  }
]

const color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)
})
