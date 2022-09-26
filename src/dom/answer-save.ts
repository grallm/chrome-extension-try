import { MessageSaveAnswer, MessageTypes, QuestionSolution } from '../types'

/**
 * Add a button to save answer
 */

export function addSaveAnswerBtn () {
  const addBtnInterval = setInterval(() => {
    // Check if correct page loaded
    const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim()

    if (questionId) {
      clearInterval(addBtnInterval)

      // Don't add button if already added
      if (window.document.querySelector('#saveAnswerBtn')) return

      const btnContainer = document.querySelector('.answers')

      if (btnContainer) {
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
      }
    }
  }, 500)
}

/**
 * Get ID of current question
 */
export function getQuestionId (): string | null {
  const questionId = window.document.querySelector('.current-question-index')?.textContent?.trim()

  return questionId ?? null
}

/**
 * Add remove button
 * Scroll to ID
 */
export function addRemoveBtnAndScroll () {
  const addBtnInterval = setInterval(() => {
    // Check if correct page loaded
    const scoreDiv = window.document.querySelector('.series-score')

    if (scoreDiv) {
      clearInterval(addBtnInterval)

      const serieIdRgx = /application\.prepacode-enpc\.fr\/series\/(.+)\/?/.exec(window.location.href)?.[1]

      if (serieIdRgx) {
        chrome.storage.sync.get('stychAnsw', function (data) {
          const answers: QuestionSolution[] = data.stychAnsw ?? []
          for (const { questionId } of answers) {
            const btnContainer = document.querySelector(`#question-${questionId} div.padding-20px.grid-left`)

            if (btnContainer) {
              btnContainer.innerHTML += `<button style="height: 50px; cursor: pointer" class="remove-answ-btn" data-question-id="${questionId}">Remove answer</button>`
            }
          }

          // Click listener
          // TODO
        })
      }

      // Scroll
      // TODO
    }
  }, 500)
}
