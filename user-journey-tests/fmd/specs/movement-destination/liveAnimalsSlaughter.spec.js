// user-journey-tests/fmd/specs/movement-destination/liveAnimalsToSlaughter.spec.js

import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'

import abattoirNamePage from '../../page-objects/movement-destination/liveAnimals/abattoirNamePage.js'
import checkAnswersPage from '../../page-objects/movement-destination/checkAnswersPage.js'

import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'
import { completeLiveAnimalsDestination } from '../../helpers/journey-helpers/movementDestination.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'

const basePath = '/fmd/movement-destination'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  abattoirName: { expected: 'Acme Abattoir Ltd', hrefSuffix: 'abattoir-name' },
  abattoirAddress: {
    expected: '10 Slaughter Rd\nUnit 4\nMeatville\nTestshire\nTE2 2ST',
    hrefSuffix: 'abattoir-address'
  }
}

describe('Movement destination — Live animals to slaughter', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
    await taskListPage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'live-animals',
      toSlaughter: true,
      startFromFirstPage: true
    })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('completes the live-animals-to-slaughter destination journey and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 3,
      taskTitle: 'Movement destination',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectMovementDestination(abattoirNamePage)

    await completeLiveAnimalsDestination({
      slaughter: true,
      abattoirName: 'Acme Abattoir Ltd',
      abattoirAddress: {
        lineOne: '10 Slaughter Rd',
        lineTwo: 'Unit 4',
        townOrCity: 'Meatville',
        county: 'Testshire',
        postcode: 'TE2 2ST'
      },
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
      position: 3,
      taskTitle: 'Movement destination',
      expectedStatus: 'Completed'
    })
  })
})
