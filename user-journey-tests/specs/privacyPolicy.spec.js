import {
  waitForFullPageUrl,
  selectElement,
  waitForPagePath
} from '../helpers/page.js'
import privacyPage from '../page-objects/privacyPage.js'

describe('Privacy policy page test', () => {
  beforeEach('Navigate to privacy page', async () => {
    await privacyPage.navigateToPageAndVerifyTitle()
  })

  // Regular links
  it('Should verify the individual privacy notices link', async () => {
    await selectElement(privacyPage.individualNoticesLink)
    await waitForPagePath(
      '/government/publications/animal-and-plant-heath-agency-privacy-notices'
    )
  })

  it('Should verify the first individual apha privacy notices link', async () => {
    await selectElement(privacyPage.aphaNotices1)
    await waitForPagePath(
      '/government/publications/animal-and-plant-heath-agency-privacy-notices'
    )
  })

  it('Should verify the second individual apha privacy notices link', async () => {
    await selectElement(privacyPage.aphaNotices2)
    await waitForPagePath(
      '/government/publications/animal-and-plant-heath-agency-privacy-notices'
    )
  })

  it('Should verify the apha gov link', async () => {
    await selectElement(privacyPage.aphaGovLink)
    await waitForPagePath(
      '/government/organisations/animal-and-plant-health-agency'
    )
  })

  it('Should verify the google terms link', async () => {
    await selectElement(privacyPage.googleTermsLink)
    await waitForFullPageUrl('https://policies.google.com/')
  })

  it('Should verify the protection law link', async () => {
    await selectElement(privacyPage.protectionRightsLink)
    await waitForPagePath(
      '/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/'
    )
  })

  it('Should verify the comissioners office link', async () => {
    await selectElement(privacyPage.comissionersOfficeLink)
    await waitForPagePath('/make-a-complaint/')
  })

  // Email links
  it('Should verify that data protection email link is visible and has correct href attribute', async () => {
    await expect(privacyPage.dataProtectionEmail).toBeDisplayed()
  })

  it('Should verify that defra group email link is visible and has correct href attribute', async () => {
    await expect(privacyPage.defraGroupEmail).toBeDisplayed()
  })

  it('Should verify that enquiries email link is visible and has correct href attribute', async () => {
    await expect(privacyPage.enquiriesEmail).toBeDisplayed()
  })
})
