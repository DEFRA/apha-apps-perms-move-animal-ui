import reasonForVisitPage from '../../page-objects/visit-details/reasonForVisitPage.js'
import visitOneDayPage from '../../page-objects/visit-details/visitOneDayPage.js'
import visitDatesPage from '../../page-objects/visit-details/visitDatesPage.js'
import visitDetailsCheckAnswersPage from '../../page-objects/visit-details/checkAnswersPage.js'

export const completeVisitDetailsSection = async ({
  reasonForVisit = 'reason for visit',
  oneDayVisit = true,
  visitDates = 'visit dates',
  startFromFirstPage = false
} = {}) => {
  if (startFromFirstPage) {
    await reasonForVisitPage.navigateToPageAndVerifyTitle()
  }
  await reasonForVisitPage.inputTextAndContinue(reasonForVisit, visitOneDayPage)
  await visitOneDayPage.selectRadioAndContinue(
    oneDayVisit ? 'yes' : 'no',
    visitDatesPage
  )
  await visitDatesPage.inputTextAndContinue(
    visitDates,
    visitDetailsCheckAnswersPage
  )
}
