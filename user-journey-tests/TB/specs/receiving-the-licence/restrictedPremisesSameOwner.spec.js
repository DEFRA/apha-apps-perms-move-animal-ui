import taskListPage from '../../page-objects/taskListPage.js'
import signInPage from '../../page-objects/signInPage.js'
import ownerNamePage from '../../page-objects/receiving-the-licence/ownerNamePage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import licenceAnswersPage from '../../page-objects/receiving-the-licence/licenceAnswersPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import { completeOriginTaskAnswers } from '../../helpers/testHelpers/movementOrigin.js'
import { completeDestinationTaskOffFarmBetweenRestrictedPremises } from '../../helpers/testHelpers/destination.js'

describe('Receiving the licence for restricted premises with the same owner', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session', async () => {
    await restoreSession()
  })

  it('Should only ask for one name and email when moving off farm between restricted premises and responsible for both premises', async () => {
    await completeOriginTaskAnswers()
    await completeDestinationTaskOffFarmBetweenRestrictedPremises()
    await taskListPage.navigateToPageAndVerifyTitle()

    await taskListPage.selectReceiveTheLicence(ownerNamePage)
    await ownerNamePage.verifyPageHeadingAndTitle()

    await ownerNamePage.inputTextAndContinue('Bruce', 'Wayne', emailPage)
    await emailPage.verifyPageHeadingAndTitle()

    await emailPage.inputTextAndContinue(
      'bruce.wayne@example.com',
      licenceAnswersPage
    )
    await licenceAnswersPage.verifyPageHeadingAndTitle()
  })
})
