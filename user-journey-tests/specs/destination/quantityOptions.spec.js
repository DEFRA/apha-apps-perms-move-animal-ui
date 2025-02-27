import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import halfHerdPage from '../../page-objects/destination/halfHerdPage.js'
import quantityOptionsPage from '../../page-objects/destination/quantityOptionsPage.js'

describe('Quantity options page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await quantityOptionsPage.navigateToPageAndVerifyTitle()
  })

  it('Should chose yes and verify correct next page', async () => {
    await quantityOptionsPage.selectYesAndContinue(destinationSelectionPage)
  })

  it('Should chose no and verify correct next page', async () => {
    await quantityOptionsPage.selectNoAndContinue(halfHerdPage)
  })

  it('Should chose unknown and verify correct next page', async () => {
    await quantityOptionsPage.selectUnknownAndContinue(destinationSelectionPage)
  })
})
