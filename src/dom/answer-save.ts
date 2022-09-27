import { MessageRemoveAnswer, MessageSaveAnswer, MessageTypes, QuestionSolution } from '../types'

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

      const serieId = /application\.prepacode-enpc\.fr\/series\/([a-z0-9]+)/i.exec(window.location.href)?.[1]

      if (serieId) {
        chrome.storage.sync.get('stychAnsw', function (data) {
          const answers: QuestionSolution[] = data.stychAnsw ?? []

          // Remove buttons if exist
          document.querySelectorAll('.remove-answ-btn').forEach(el => el.remove())

          for (const { questionId } of answers) {
            const btnContainer = document.querySelector(`#question-${questionId} div.padding-20px.grid-left`)

            if (btnContainer) {
              btnContainer.innerHTML += `<button style="height: 50px; cursor: pointer" class="remove-answ-btn" data-question-id="${questionId}">Remove answer</button>`
            }
          }

          // Click listener
          const removeBtns = document.querySelectorAll('.remove-answ-btn')
          for (const btn of removeBtns) {
            btn.addEventListener('click', () => {
              const questionId = btn.getAttribute('data-question-id')
              if (questionId) {
                // Send message to remove from storage
                const message: MessageRemoveAnswer = {
                  type: MessageTypes.REMOVE_ANSWER,
                  questionId,
                  serieId
                }
                chrome.runtime.sendMessage(message)
              }
            })
          }
        })
      }

      // Scroll
      // TODO
    }
  }, 500)
}
