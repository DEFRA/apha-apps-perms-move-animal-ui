import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import disinfectantPage from '../../page-objects/biosecurity/disinfectantPage.js'

describe('Manure details page spec', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await manureDetailsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that the page errors when nothing is selected', async () => {
    await manureDetailsPage.checkboxErrorTest()
  })

  it('Should select an option and continue without error', async () => {
    await manureDetailsPage.selectCheckboxesAndContinue(
      [manureDetailsPage.stored],
      disinfectantPage
    )
  })
})
