import biosecBadgersPage from '../../page-objects/biosecurity/biosecBadgersPage.js'
import keptSeparatelyPage from '../../page-objects/biosecurity/keptSeparatelyPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Biosecurity badgers page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await biosecBadgersPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await biosecBadgersPage.singleInputErrorTest(
      '',
      biosecBadgersPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await biosecBadgersPage.inputTextAndContinue(
      'Badger measures',
      keptSeparatelyPage
    )
  })
})
