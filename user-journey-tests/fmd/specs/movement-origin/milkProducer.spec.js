import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import typeOfPremisesPage from '../../page-objects/movement-origin/typeOfPremisesPage.js'
import checkAnswersPage from '../../page-objects/movement-origin/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeMovementOriginSection,
  ORIGIN_ROUTE,
  PREMISES
} from '../../helpers/journey-helpers/movementOrigin.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-origin'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  premisesType: { expected: 'Farm', hrefSuffix: 'premises-type' },
  cphNumber: { expected: '12/345/6789', hrefSuffix: 'cph-number' },
  originAddress: {
    expected: '1 Test Lane\nline 2\nTesttown\nTestshire\nTE1 1ST',
    hrefSuffix: 'address'
  }
}

describe('Movement origin — Milk producer route', () => {
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

  it('completes the milk producer movement-origin journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(typeOfPremisesPage)

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.MILK,
      premisesType: PREMISES.FARM,
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
      position: 2,
      taskTitle: 'Movement origin',
      expectedStatus: 'Completed'
    })
  })
})
