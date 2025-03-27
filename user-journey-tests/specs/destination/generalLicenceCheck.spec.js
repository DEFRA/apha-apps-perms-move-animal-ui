import { selectElement, waitForPagePath } from '../../helpers/page.js'
import destinationSelectionPage from '../../page-objects/destination/destinationSelectionPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('General licence page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await signInPage.signInUsingTestCredentials()
    await generalLicencePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify pressing continue gives takes you to the check answers page', async () => {
    await selectElement(generalLicencePage.continueLink)
    await waitForPagePath(destinationSelectionPage.pagePath)
  })
})
