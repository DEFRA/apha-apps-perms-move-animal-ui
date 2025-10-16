import howFieldSeparatedPage from '../../page-objects/biosecurity/howFieldSeparatedPage.js'
import lastGrazedPage from '../../page-objects/biosecurity/lastGrazedPage.js'
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

  it('Should verify that page errors when nothing is entered', async () => {
    await howFieldSeparatedPage.singleInputErrorTest(
      '',
      howFieldSeparatedPage.noInputError
    )
  })

  it('Should select checkbox input and continue without error', async () => {
    await howFieldSeparatedPage.selectCheckboxesAndContinue(
      'grazingFieldHowSeparated',
      lastGrazedPage
    )
  })
})
