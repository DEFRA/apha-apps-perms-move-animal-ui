import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import { waitForElement, waitForPagePath } from '../../helpers/page.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('Additional info page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await loginAndSaveSession(signInPage)
    await additionalInfoPage.navigateToPageAndVerifyTitle()
  })

  it('Should input no text and verify next page', async () => {
    await waitForElement(additionalInfoPage.additionInfoInput)
    await additionalInfoPage.selectContinue()
    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
