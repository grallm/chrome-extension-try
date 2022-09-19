export interface PageEntry {
  id: string
  title: string,
  link: string,
  parent: string | null
}

export enum MessageTypes {
  GET_NUMBER_ENTRIES,
  SEARCH_TEXT,
  GET_ALL_ENTRIES
}

export interface Message {
  type: MessageTypes
}
export interface MessageSearchText extends Message {
  type: MessageTypes.SEARCH_TEXT
  text: string
}

export interface ResponsePageEntries {
  pages: PageEntry[]
}

export interface QuestionSolution {
  serieId: string
  date: number
  questionId: string
}
