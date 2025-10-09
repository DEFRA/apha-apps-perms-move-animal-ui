import { loginAndSaveSession } from '../../../TB/helpers/authSessionManager.js'
import signInPage from '../../../TB/page-objects/signInPage.js'
import aboutCheckAnswersPage from '../../page-objects/about-the-movement/checkAnswersPage.js'
import movementTypePage from '../../page-objects/about-the-movement/movementTypePage.js'
import taskListPage from '../../page-objects/taskListPage.js'
import { waitForPagePath } from '../../../TB/helpers/page.js'
import { completeAboutMovementSection } from '../../helpers/journey-helpers/aboutTheMovement.js'
import whoIsResponsiblePage from '../../page-objects/receiving-the-licence/whoIsResponsiblePage.js'
import checkAnswersPage from '../../page-objects/receiving-the-licence/checkAnswersPage.js'
import { verifyCheckAnswersPage } from '../../helpers/function-helpers/verifyCheckAnswers.js'
import { completeReceivingLicenceSection } from '../../helpers/journey-helpers/receivingTheLicence.js'

const basePath = '/exotics/receiving-the-licence'
const redirectUri = `${basePath}/check-answers`

const journeyData = {
  name: {
    expected: 'FirstName LastName',
    hrefSuffix: 'visit/responsible-person-name'
  },
  email: {
    expected: 'eoin.corr@esynergy.co.uk',
    hrefSuffix: 'enter-email-address'
  }
}

describe('Receiving the licence - visit', async () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
    await movementTypePage.navigateToPageAndVerifyTitle()
    await completeAboutMovementSection()
    await aboutCheckAnswersPage.verifyPageHeadingAndTitle(
      'Check your answers before you continue your application'
    )
    await aboutCheckAnswersPage.selectContinue()
    await waitForPagePath(taskListPage.pagePath)
  })

  it('Should complete the receiving the licence section for a visit', async () => {
    await taskListPage.verifyStatus({
      position: 4,
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Incomplete'
    })

    await taskListPage.selectReceivingLicence(whoIsResponsiblePage)
    await completeReceivingLicenceSection({ route: 'visit' })

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
      taskTitle: 'Receiving the licence',
      expectedStatus: 'Completed'
    })
  })
})
