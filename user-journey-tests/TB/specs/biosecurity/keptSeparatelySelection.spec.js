import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import grazingPage from '../../page-objects/biosecurity/grazingPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import { verifySelectionPersistence } from '../../helpers/page.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Kept separately selection test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await keptSeparatelyPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the kept separately page errors when no option is selected', async () => {
    await keptSeparatelyPage.radioErrorTest()
  })

  it('Should select Yes, continue and check its maintained', async () => {
    await keptSeparatelyPage.selectYesAndContinue(grazingPage)
    await verifySelectionPersistence(
      manureDetailsPage,
      keptSeparatelyPage,
      keptSeparatelyPage.yesRadio
    )
  })

  it('Should choose No and check its maintained', async () => {
    await keptSeparatelyPage.selectNoAndContinue(manureDetailsPage)
    await verifySelectionPersistence(
      manureDetailsPage,
      keptSeparatelyPage,
      keptSeparatelyPage.noRadio
    )
  })
})
