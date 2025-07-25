import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/aboutTheMovement.js'
import reasonForMovementPage from '../../page-objects/movement-details/reasonForMovementPage.js'
import maxJourneysPage from '../../page-objects/movement-details/maxJourneysPage.js'
import moreThanOneDayPage from '../../page-objects/movement-details/moreThanOneDayPage.js'
import movementDatesPage from '../../page-objects/movement-details/movementDatesPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

const basePath = '/exotics/movement-details'
const redirectUri = `${basePath}/check-answers`
const journeyData = {
  reason: {
    expected: 'reason for movement',
    hrefSuffix: 'reason'
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

const getExpected = (key) => journeyData[key].expected
const getExpectedHref = (key) =>
  `${basePath}/${journeyData[key].hrefSuffix}?redirect_uri=${redirectUri}`

describe('Movement details - more than one date', async () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection('onto-premises')
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the visit details flow', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDetails(reasonForMovementPage)
    await reasonForMovementPage.inputTextAndContinue(
      'reason for movement',
      maxJourneysPage
    )
    await maxJourneysPage.inputTextAndContinue(2, moreThanOneDayPage)
    await moreThanOneDayPage.selectYesAndContinue(movementDatesPage)
    await movementDatesPage.inputTextAndContinue(
      'movement dates',
      checkAnswersPage
    )

    for (const key of Object.keys(journeyData)) {
      const valueEl = await checkAnswersPage.getValue(key)
      const changeLink = await checkAnswersPage.getChangeLink(key)

      await expect(valueEl).toHaveTextContaining(getExpected(key))
      await expect(changeLink).toHaveAttribute('href', getExpectedHref(key))
    }

    await checkAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)

    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement details',
      expectedStatus: 'Completed'
    })
  })
})
