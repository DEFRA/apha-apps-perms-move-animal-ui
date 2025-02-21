import ParishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import importParishPage from '../../page-objects/origin/importParishPage.js'
import importAddressPage from '../../page-objects/origin/importAddressPage.js'

describe('Import CPH number page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await importParishPage.navigateToPageAndVerifyTitle()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      validInput,
      importAddressPage
    )
  })
})
