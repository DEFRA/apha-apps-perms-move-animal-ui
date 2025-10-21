import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

describe('Manur details page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await manureDetailsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await manureDetailsPage.checkboxErrorTest()
  })

  it('Should input correct input and continue without error', async () => {
    await manureDetailsPage.selectCheckboxesAndContinue(
      [manureDetailsPage['not-purchased']],
      disinfectantPage
    )
  })
})
