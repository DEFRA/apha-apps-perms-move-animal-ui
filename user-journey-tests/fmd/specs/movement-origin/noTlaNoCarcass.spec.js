import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import tlaYesNoPage from '../../page-objects/movement-origin/tlaYesNoPage.js'
import checkAnswersPage from '../../page-objects/movement-origin/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import {
  completeMovementOriginSection,
  ORIGIN_ROUTE,
  PREMISES,
  ANIMALS
} from '../../helpers/journey-helpers/movementOrigin.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-origin'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  isTLA: { expected: 'No', hrefSuffix: 'TLA-yes-no' },
  premisesType: { expected: 'Farm', hrefSuffix: 'premises-type' },
  cphNumber: { expected: '12/345/6789', hrefSuffix: 'cph-number' },
  originAddress: {
    expected: '1 Test Lane\nline 2\nTesttown\nTestshire\nTE1 1ST',
    hrefSuffix: 'address'
  },
  animalsKept: { expected: 'Cattle', hrefSuffix: 'animals-kept-on-premises' }
}

describe('Movement origin — Not milk, no TLA, not slaughter/carcass', () => {
  // eslint-disable-next-line no-undef
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

  it('completes the not-milk no-TLA not-slaughter movement-origin journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 2,
      taskTitle: 'Movement origin',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementOrigin(tlaYesNoPage)

    await completeMovementOriginSection({
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: false,
      premisesType: PREMISES.FARM,
      animalsSelections: [ANIMALS.CATTLE],
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
