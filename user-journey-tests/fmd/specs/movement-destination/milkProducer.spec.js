// user-journey-tests/fmd/specs/movement-destination/milkProducer.spec.js

import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import milkPurchaserPage from '../../page-objects/movement-destination/milk/milkPurchaserPage.js'
import checkAnswersPage from '../../page-objects/movement-destination/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeMovementDestinationMilk } from '../../helpers/journey-helpers/movementDestination.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-destination'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  companySellingMilkTo: {
    expected: 'Acme Dairies Ltd',
    hrefSuffix: 'milk-selling-company-name'
  }
}

describe('Movement destination — Milk producer route', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'milk',
      producerDairy: 'producer',
      startFromFirstPage: true
    })

    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete movement destination (milk producer) and verify CYA', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement destination',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDestination(milkPurchaserPage)

    await completeMovementDestinationMilk({
      startFromFirstPage: true,
      purchaser: 'Acme Dairies Ltd'
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
      position: 3,
      taskTitle: 'Movement destination',
      expectedStatus: 'Completed'
    })
  })
})
