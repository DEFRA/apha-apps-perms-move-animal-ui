import calvesPage from '../../page-objects/identification/calvesPage.js'
import { verifySelectionPersistence } from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import oldestCalfDobPage from '../../page-objects/identification/oldestCalfDobPage.js'
import testingDatesPage from '../../page-objects/identification/testingDatesPage.js'

describe('Calves under 42 days spec', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await calvesPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await calvesPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await calvesPage.selectYesAndContinue(oldestCalfDobPage)
    await verifySelectionPersistence(
      oldestCalfDobPage,
      calvesPage,
      calvesPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await calvesPage.selectNoAndContinue(testingDatesPage)
    await verifySelectionPersistence(
      testingDatesPage,
      calvesPage,
      calvesPage.noRadio
    )
  })
})
