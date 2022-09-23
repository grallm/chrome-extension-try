import { MessageSaveAnswer, MessageTypes } from '../types'

/**
 * Add a button to save answer
 */
export function addSaveAnswerBtn (): 'success' | 'error' {
  const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim()

  if (questionId) {
    const btnContainer = document.querySelector('.answers')

    if (btnContainer) {
      // Delete if exists
      document.querySelector('#saveAnswerBtn')?.remove()

      const saveBtn = document.createElement('button')
      saveBtn.id = 'saveAnswerBtn'
      saveBtn.textContent = 'Save answer'
      saveBtn.style.marginRight = 'auto'
      saveBtn.style.cursor = 'pointer'

      btnContainer.prepend(saveBtn)

      saveBtn.addEventListener('click', () => {
        // Send message to background
        const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim() ?? ''
        const serieId = new URLSearchParams(window.location.search).get('seriesId') || ''

        const message: MessageSaveAnswer = {
          type: MessageTypes.SAVE_ANSWER,
          questionId,
          serieId
        }
        chrome.runtime.sendMessage(message)
      })

      return 'success'
    }
  }
  return 'error'
}

/**
 * Get ID of current question
 */
export function getQuestionId (): string | null {
  const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim()

  return questionId ?? null
}
