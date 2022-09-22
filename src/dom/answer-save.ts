
/**
 * Add a button to save answer
 */
export function addSaveAnswerBtn (): HTMLButtonElement | null {
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

      btnContainer.prepend(saveBtn)

      console.log('saveBtn', saveBtn)
      return saveBtn
    }
  }

  return null
}

/**
 * Get ID of current question
 */
export function getQuestionId (): string | null {
  const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim()

  return questionId ?? null
}
