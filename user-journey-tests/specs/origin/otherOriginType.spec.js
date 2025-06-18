import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import originTypeOtherPage from '../../page-objects/origin/originTypeOtherPage.js'

describe('Origin type other page spec', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await originTypeOtherPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await originTypeOtherPage.singleInputErrorTest(
      '',
      originTypeOtherPage.noInputError
    )
  })

  it('Should input correct input and continue without error', async () => {
    await originTypeOtherPage.inputTextAndContinue(
      'Other origin type',
      onFarmCPHPage
    )
  })
})
