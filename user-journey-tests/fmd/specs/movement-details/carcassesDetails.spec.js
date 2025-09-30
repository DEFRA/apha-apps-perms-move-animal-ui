import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import disposalDatePage from '../../page-objects/movement-details/carcasses/disposalDatePage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeCarcassesMovementSection } from '../../helpers/journey-helpers/movementDetails.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-details'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  disposalDate: { expected: '7 March 2050', hrefSuffix: 'disposal-date' }
}

describe('Movement details — carcasses', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'carcasses',
      startFromFirstPage: true
    })

    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete movement details carcasses journey and verify CYA', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Movement details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDetails(disposalDatePage)

    await completeCarcassesMovementSection({
      startFromFirstPage: true,
      disposalDate: { day: '07', month: '03', year: '2050' }
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
