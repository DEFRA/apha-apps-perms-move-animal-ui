import { loginAndSaveSession } from '../../helpers/authSessionManager.js'
import { selectElement, waitForPagePath } from '../../helpers/page.js'
import additionalInfoPage from '../../page-objects/destination/additionalInfoPage.js'
import generalLicencePage from '../../page-objects/destination/generalLicencePage.js'
import signInPage from '../../page-objects/signInPage.js'

describe('General licence page test', () => {
  beforeEach('Log in and navigate to page', async () => {
    await loginAndSaveSession(signInPage)
    await generalLicencePage.navigateToPageAndVerifyTitle()
  })

  it('Should verify pressing continue gives takes you to the check answers page', async () => {
    await selectElement(generalLicencePage.continueLink)
    await waitForPagePath(additionalInfoPage.pagePath)
  })
})
