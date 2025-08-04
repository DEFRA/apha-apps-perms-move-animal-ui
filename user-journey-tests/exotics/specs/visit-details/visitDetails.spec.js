import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import reasonForVisitPage from '../../page-objects/visit-details/reasonForVisitPage.js'
import visitOneDayPage from '../../page-objects/visit-details/visitOneDayPage.js'
import visitDatesPage from '../../page-objects/visit-details/visitDatesPage.js'
import visitDetailsCheckAnswersPage from '../../page-objects/visit-details/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/exotics/visit-details'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  reason: {
    expected: 'reason for visit',
    hrefSuffix: 'reason'
  },
  isDurationMoreThanOneDay: {
    expected: 'Yes',
    hrefSuffix: 'duration-more-than-one-day'
  },
  multipleDates: {
    expected: 'visit dates',
    hrefSuffix: 'multiple-dates'
  }
}

describe('Visit details - more than one date', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('visit')
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the visit details flow', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Visit details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectVisitDetails(reasonForVisitPage)
    await reasonForVisitPage.inputTextAndContinue(
      'reason for visit',
      visitOneDayPage
    )
    await visitOneDayPage.selectYesAndContinue(visitDatesPage)
    await visitDatesPage.inputTextAndContinue(
      'visit dates',
      visitDetailsCheckAnswersPage
    )

    verifyCheckAnswersPage(
      journeyData,
      basePath,
      redirectUri,
      visitDetailsCheckAnswersPage
    )

    await visitDetailsCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Visit details',
      expectedStatus: 'Completed'
    })
  })
})
