import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import movementRepeatedPage from '../../page-objects/movement-details/milk/movementRepeatedPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeMilkMovementSection,
  MILK_ROLE
} from '../../helpers/journey-helpers/movementDetails.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-details'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  twoWeekRepeat: { expected: 'No', hrefSuffix: 'repeat-movement' },
  expectMovementDate: {
    expected: '7 March 2050',
    hrefSuffix: 'milk-movement-dates'
  }
}

describe('Movement details — milk producer', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'milk',
      milkResponsible: true,
      startFromFirstPage: true
    })

    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete movement details milk (producer) journey and verify CYA', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Movement details',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDetails(movementRepeatedPage)

    await completeMilkMovementSection({
      role: MILK_ROLE.PRODUCER,
      repeated: false,
      startFromFirstPage: true
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
