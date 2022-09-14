export interface PageEntry {
  id: string
  title: string,
  link: string,
  parent: string | null
}

export enum MessageTypes {
  GET_NUMBER_ENTRIES,
  SEARCH_TEXT
}

export interface Message {
  type: MessageTypes
}
export interface MessageSearchText extends Message {
  type: MessageTypes.SEARCH_TEXT
  text: string
}

export interface ResponseSearchText {
  pages: PageEntry[]
}
