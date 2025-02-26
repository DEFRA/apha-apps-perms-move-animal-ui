import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import quantityOptionsPage from '../../page-objects/destination/quantityOptionsPage.js'

describe('Paris holding page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await browser.reloadSession()
    await reasonForMovementPage.navigateToPageAndVerifyTitle()
  })

  it('Should chose restocking ands verify correct next page', async () => {
    await reasonForMovementPage.selectRestockingAndContinue(quantityOptionsPage)
  })

  it('Should chose breeding male ands verify correct next page', async () => {
    await reasonForMovementPage.selectBreedingMaleAndContinue(
      additionalInfoPage
    )
  })
})
