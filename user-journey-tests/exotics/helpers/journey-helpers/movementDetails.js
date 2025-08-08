import reasonForMovementPage from '../../page-objects/movement-details/reasonForMovementPage.js'
import movementFrequencyPage from '../../page-objects/movement-details/movementFrequencyPage.js'
import maxJourneysPage from '../../page-objects/movement-details/maxJourneysPage.js'
import moreThanOneDayPage from '../../page-objects/movement-details/moreThanOneDayPage.js'
import movementDatesPage from '../../page-objects/movement-details/movementDatesPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

export const completeMovementDetailsSection = async ({
  reason = 'reason for movement',
  frequency = 'regular',
  maxJourneys = 2,
  moreThanOneDay = true,
  movementDates = 'movement dates'
} = {}) => {
  await reasonForMovementPage.inputTextAndContinue(
    reason,
    movementFrequencyPage
  )

  await movementFrequencyPage.selectRadioAndContinue(frequency, maxJourneysPage)

  await maxJourneysPage.inputTextAndContinue(
    maxJourneys.toString(),
    moreThanOneDayPage
  )

  await moreThanOneDayPage.selectRadioAndContinue(
    moreThanOneDay ? 'yes' : 'no',
    movementDatesPage
  )

  await movementDatesPage.inputTextAndContinue(movementDates, checkAnswersPage)
}
