import { loginAndSaveSession } from '../helpers/authSessionManager.js'
import privacyPage from '../page-objects/privacyPage.js'
import signInPage from '../page-objects/signInPage.js'

const privacyNoticesUrl =
  'https://www.gov.uk/government/publications/animal-and-plant-health-agency-privacy-notices'

describe('Privacy policy page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Navigate to privacy page', async () => {
    await privacyPage.navigateToPageAndVerifyTitle()
  })

  // Regular links
  it('Should verify the individual privacy notices link', async () => {
    await expect(privacyPage.individualNoticesLink).toBeDisplayed()
    await expect(privacyPage.individualNoticesLink).toHaveAttribute(
      'href',
      privacyNoticesUrl
    )
  })

  it('Should verify the first individual apha privacy notices link', async () => {
    await expect(privacyPage.aphaNotices1).toBeDisplayed()
    await expect(privacyPage.aphaNotices1).toHaveAttribute(
      'href',
      privacyNoticesUrl
    )
  })

  it('Should verify the second individual apha privacy notices link', async () => {
    await expect(privacyPage.aphaNotices2).toBeDisplayed()
    await expect(privacyPage.aphaNotices2).toHaveAttribute(
      'href',
      privacyNoticesUrl
    )
  })

  it('Should verify the apha gov link', async () => {
    await expect(privacyPage.aphaGovLink).toBeDisplayed()
    await expect(privacyPage.aphaGovLink).toHaveAttribute(
      'href',
      'http://www.gov.uk/apha'
    )
  })

  it('Should verify the google terms link', async () => {
    await expect(privacyPage.googleTermsLink).toBeDisplayed()
    await expect(privacyPage.googleTermsLink).toHaveAttribute(
      'href',
      'https://policies.google.com/'
    )
  })

  it('Should verify the comissioners office link', async () => {
    await expect(privacyPage.comissionersOfficeLink).toBeDisplayed()
    await expect(privacyPage.comissionersOfficeLink).toHaveAttribute(
      'href',
      'https://ico.org.uk/make-a-complaint/'
    )
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
