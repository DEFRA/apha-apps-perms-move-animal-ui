import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import onFarmAddressPage from '../../page-objects/origin/onFarmAddressPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Parish holding page test (on farm)', () => {
  beforeEach('Log in and navigate to page', async () => {
    await loginAndSaveSession(signInPage)
    await onFarmCPHPage.navigateToPageAndVerifyTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await onFarmCPHPage.inputParishHoldingNumberAndContinue(
      validInput,
      onFarmAddressPage
    )
  })
})
