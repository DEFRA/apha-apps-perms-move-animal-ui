import {
  selectElement,
  validateHrefOfElement,
  waitForPagePath
} from '../helpers/page.js'
import cookiesPage from '../page-objects/cookiesPage.js'
import landingPage from '../page-objects/landingPage.js'
import accessibilityStatementPage from '../page-objects/accessibilityStatementPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'
import signInPage from '../page-objects/signInPage.js'

const expectedLinks = [
  'https://www.gov.uk/',
  'https://www.gov.uk/guidance/bovine-tb-getting-your-cattle-tested-in-england',
  'https://www.gov.uk/government/publications/tb-restricted-cattle-application-for-movement-licence-in-england'
]
describe('Landing page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Reset browser state and navigate to page', async () => {
    await landingPage.navigateToPageAndVerifyTitle()
  })

  it('should have all external links working', async () => {
    const links = await landingPage.verifyExternalLinks()

    for await (const link of links) {
      expect(expectedLinks).toContain(await link.getAttribute('href'))
    }
  })

  it('Should verify start now button visible on landing page', async () => {
    await landingPage.verifyPageHeadingAndTitle()
    await landingPage.verifyStartNowButton('Start now')
  })

  it('Should verify the feedback link', async () => {
    validateHrefOfElement(
      landingPage.getFeedbackLink(),
      'https://defragroup.eu.qualtrics.com/jfe/form/SV_7ZDFNwIA2wLF9lk'
    )
  })

  it('Should verify cookie link in the footer', async () => {
    await selectElement(landingPage.getCookiesFooterLink())
    await waitForPagePath(cookiesPage.pagePath)
    await cookiesPage.verifyPageHeadingAndTitle()
  })

  it('Should verify the accessibility link in the footer', async () => {
    await selectElement(landingPage.getAccessibilityFooterLink())
    await waitForPagePath(accessibilityStatementPage.pagePath)
    await accessibilityStatementPage.verifyPageHeadingAndTitle()
  })
})
