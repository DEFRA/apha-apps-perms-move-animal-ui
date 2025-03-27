import importParishPage from '../../page-objects/origin/importParishPage.js'
import importAddressPage from '../../page-objects/origin/importAddressPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Import CPH number page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await importParishPage.navigateToPageAndVerifyTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await importParishPage.inputParishHoldingNumberAndContinue(
      validInput,
      importAddressPage
    )
  })
})
