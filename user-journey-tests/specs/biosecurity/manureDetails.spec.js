import manureDetailsPage from '../../page-objects/biosecurity/manureDetailsPage.js'
import anySharedBuildingsPage from '../../page-objects/biosecurity/anySharedBuildingsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Manur details page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await manureDetailsPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await manureDetailsPage.singleInputErrorTest(
      '',
      manureDetailsPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await manureDetailsPage.inputTextAndContinue(
      '2 years',
      anySharedBuildingsPage
    )
  })
})
