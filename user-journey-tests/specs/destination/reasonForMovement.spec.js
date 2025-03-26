import reasonForMovementPage from '../../page-objects/destination/reasonForMovementPage.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import quantityOptionsPage from '../../page-objects/destination/quantityOptionsPage.js'
import signInPage from '../../page-objects/signInPage.js'
import { loginAndSaveSession } from '../../helpers/authSessionManager.js'

describe('Reason for movement page test', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to page', async () => {
    await reasonForMovementPage.navigateToPageAndVerifyTitle()
  })

  it('Should chose restocking and verify correct next page', async () => {
    await reasonForMovementPage.selectRestockingAndContinue(quantityOptionsPage)
  })

  it('Should chose breeding male and verify correct next page', async () => {
    await reasonForMovementPage.selectBreedingMaleAndContinue(
      additionalInfoPage
    )
  })
})
