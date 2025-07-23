import calvesPage from '../../page-objects/identification/calvesPage.js'
import cattleOver42DaysPage from '../../page-objects/identification/cattleOver42DaysPage.js'
import earTagsCalvesPage from '../../page-objects/identification/earTagsCalvesPage.js'
import earTagsOver42DaysOldPage from '../../page-objects/identification/earTagsOver42DaysOldPage.js'
import identificationAnswersPage from '../../page-objects/identification/identificationAnswersPage.js'
import identificationWarningPage from '../../page-objects/identification/identificationWarningPage.js'
import oldestCalfDobPage from '../../page-objects/identification/oldestCalfDobPage.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'
import { waitForPagePath } from '../page.js'

// Helper function to complete the origin task
export const completeIdentificationTaskLongWay = async () => {
  await calvesPage.navigateToPageAndVerifyTitle()
  await calvesPage.selectYesAndContinue(oldestCalfDobPage)
  await oldestCalfDobPage.enterDateAndContinue(
    { day: '21', month: '09', year: '1995' },
    identificationWarningPage
  )
  await identificationWarningPage.selectContinue()
  await waitForPagePath(earTagsCalvesPage.pagePath)
  await earTagsCalvesPage.inputTextAndContinue(
    'ear tags calves',
    cattleOver42DaysPage
  )
  await cattleOver42DaysPage.selectYesAndContinue(testingDatesPage)
  await testingDatesPage.inputTextAndContinue(
    '21/09/1995',
    earTagsOver42DaysOldPage
  )
  await earTagsOver42DaysOldPage.inputTextAndContinue(
    'ear tags',
    identificationAnswersPage
  )
}
