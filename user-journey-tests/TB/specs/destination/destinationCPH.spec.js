import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import destinationAddressPage from '../../page-objects/destination/destinationAddressPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Parish holding page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await loginAndSaveSession(signInPage)
    await destinationCPHPage.navigateToPageAndVerifyTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await destinationCPHPage.inputParishHoldingNumberAndContinue(
      validInput,
      destinationAddressPage
    )
  })
})
