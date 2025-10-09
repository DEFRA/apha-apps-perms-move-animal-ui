import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'

import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import { completeAboutMovement } from '../../helpers/journey-helpers/aboutTheMovement.js'

import checkAnswersPage from '../../page-objects/receiving-the-licence/checkAnswersPage.js'
import {
  completeReceivingLicenceSection,
  LICENCE_RECIPIENT
} from '../../helpers/journey-helpers/receivingTheLicence.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import responsibleForOriginPage from '../../page-objects/receiving-the-licence/responsibleForOriginPage.js'

const basePath = '/fmd/receiving-the-licence'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  responsibleForOrigin: {
    expected: 'Jane Doe',
    hrefSuffix: 'name-of-person-responsible-at-origin'
  },
  email: { expected: 'applicant@example.com', hrefSuffix: 'email-address' }
}

describe('Receiving the licence – NOT milk (Registered keeper)', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()

    await completeAboutMovement({
      movementContext: 'off-of-farm',
      moving: 'milk',
      startFromFirstPage: true
    })
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('completes the Registered keeper route and verifies CYA', async () => {
    await taskListPage.verifyStatus({
      position: 5,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectReceivingLicence(responsibleForOriginPage)

    await completeReceivingLicenceSection({
      recipient: LICENCE_RECIPIENT.MILK_PRODUCER,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'applicant@example.com',
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
      position: 5,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
