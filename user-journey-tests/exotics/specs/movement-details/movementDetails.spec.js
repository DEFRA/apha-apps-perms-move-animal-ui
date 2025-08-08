import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import reasonForMovementPage from '../../page-objects/movement-details/reasonForMovementPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeMovementDetailsSection } from '../../helpers/journey-helpers/movementDetails.js'

const basePath = '/exotics/movement-details'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  reason: {
    expected: 'reason for movement',
    hrefSuffix: 'reason'
  },
  frequency: {
    expected: 'Regular movement',
    hrefSuffix: 'frequency'
  },
  maximumNumberOfJourneys: {
    expected: '2',
    hrefSuffix: 'maximum-number-of-journeys'
  },
  isDurationMoreThanOneDay: {
    expected: 'Yes',
    hrefSuffix: 'duration-more-than-one-day'
  },
  multipleDates: {
    expected: 'movement dates',
    hrefSuffix: 'multiple-dates'
  }
}

describe('Movement details - more than one date', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection({ onOffVisit: 'onto-premises' })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the visit details flow', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Movement details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDetails(reasonForMovementPage)
    await completeMovementDetailsSection()

    await verifyCheckAnswersPage({
      journeyData,
      basePath,
      redirectUri,
      checkAnswersPage
    })

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Movement details',
      expectedStatus: 'Completed'
    })
  })
})
