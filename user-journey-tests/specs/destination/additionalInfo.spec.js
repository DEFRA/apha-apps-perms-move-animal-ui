import { waitForElement, waitForPagePath } from '../../helpers/page.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'

describe('Additional info page test', () => {
  beforeEach('Reset browser state and navigate to page', async () => {
    await additionalInfoPage.navigateToPageAndVerifyTitle()
  })

  it('Should input no text and verify next page', async () => {
    await waitForElement(additionalInfoPage.additionInfoInput)
    await additionalInfoPage.selectContinue()
    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
