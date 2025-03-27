import onFarmCPHPage from '../../page-objects/origin/onFarmCPHPage.js'
import onFarmAddressPage from '../../page-objects/origin/onFarmAddressPage.js'

describe('Paris holding page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
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
