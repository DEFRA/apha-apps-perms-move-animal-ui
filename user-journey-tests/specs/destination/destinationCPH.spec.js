import destinationCPHPage from '../../page-objects/destination/destinationCPHPage.js'
import destinationAddressPage from '../../page-objects/destination/destinationAddressPage.js'

describe('Paris holding page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
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
