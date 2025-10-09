import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import maxDaysNeededPage from '../../page-objects/movement-details/live-animals/maxDaysNeededPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeLiveAnimalsMovementSection } from '../../helpers/journey-helpers/movementDetails.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-details'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  maximumDaysAnimals: { expected: '5', hrefSuffix: 'number-of-days' },
  maxJourneys: { expected: '8', hrefSuffix: 'number-of-journeys' },
  movementStart: { expected: '7 March 2050', hrefSuffix: 'start-date' },
  movementEnd: { expected: '21 March 2050', hrefSuffix: 'end-date' }
}

describe('Movement details — live animals', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'live-animals',
      toSlaughter: false,
      startFromFirstPage: true
    })

    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete movement details live-animals journey and verify CYA', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Movement details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDetails(maxDaysNeededPage)

    await completeLiveAnimalsMovementSection({
      startFromFirstPage: true,
      maxDays: '5',
      maxJourneys: '8',
      startDate: { day: '07', month: '03', year: '2050' },
      endDate: { day: '21', month: '03', year: '2050' }
    })

    await checkAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )

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
