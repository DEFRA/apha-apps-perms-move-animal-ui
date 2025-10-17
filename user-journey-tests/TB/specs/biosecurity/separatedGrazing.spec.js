import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Separated grazing page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await howFieldSeparatedPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is selected', async () => {
    await howFieldSeparatedPage.checkboxErrorTest()
  })

  it('Should select an option and continue without error', async () => {
    await howFieldSeparatedPage.selectCheckboxesAndContinue(
      [howFieldSeparatedPage.roadsCreateBoundary],
      manureDetailsPage
    )
  })
})
