import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import { verifySelectionPersistence } from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Grazing selection test', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await grazingPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await grazingPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await grazingPage.selectYesAndContinue(howFieldSeparatedPage)
    await verifySelectionPersistence(
      howFieldSeparatedPage,
      grazingPage,
      grazingPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await grazingPage.selectNoAndContinue(manureDetailsPage)
    await verifySelectionPersistence(
      howFieldSeparatedPage,
      grazingPage,
      grazingPage.noRadio
    )
  })
})
