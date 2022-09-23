export interface PageEntry {
  id: string
  title: string,
  link: string,
  parent: string | null
}

export const enum MessageTypes {
  GET_NUMBER_ENTRIES,
  SEARCH_TEXT,
  GET_ALL_ENTRIES,
  SAVE_ANSWER
}

export interface Message {
  type: MessageTypes
}
export interface MessageSearchText extends Message {
  type: MessageTypes.SEARCH_TEXT
  text: string
}
export interface MessageSaveAnswer extends Message {
  type: MessageTypes.SAVE_ANSWER
  serieId: string
  questionId: string
}

export interface ResponsePageEntries {
  pages: PageEntry[]
}

export interface QuestionSolution {
  serieId: string
  date: number
  questionId: string
}
