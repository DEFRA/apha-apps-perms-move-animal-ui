import { browser } from '@wdio/globals'
import {
  selectElement,
  selectLinkAndVerifyTitle,
  validateElementVisibleAndText,
  validateHrefOfElement,
  verifyPageTitle,
  waitForPagePath
} from '../helpers/page.js'
import cookiesPage from '../page-objects/cookiesPage.js'
import landingPage from '../page-objects/landingPage.js'
import accessibilityStatementPage from '../page-objects/accessibilityStatementPage.js'
import { loginAndSaveSession } from '../helpers/authSessionManager.js'
import signInPage from '../page-objects/signInPage.js'

const welshPageHeadingAndTitle = 'Symud anifeiliaid dan reolaethau clefydau'
const welshFeedback = 'rhoi eich adborth (yn agor mewn tab newydd)'
const welshFeedbackBanner =
  "Mae hwn yn wasanaeth newydd. Helpwch ni i'w wella a rhoi eich adborth (yn agor mewn tab newydd)."
const welshHelpText =
  "Os oes angen help arnoch gyda'r gwasanaeth gallwch ffonio 03000 200 301."

const expectedLinks = [
  'https://www.gov.uk/',
  'https://www.gov.uk/guidance/bovine-tb-get-your-cattle-tested-in-england',
  'https://www.gov.uk/government/publications/tb-movement-licence-moving-animals-between-restricted-premises-in-england'
]
describe('Landing page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Reset browser state and navigate to page', async () => {
    await landingPage.open('/')
    await browser.deleteCookies('language')
    await landingPage.navigateToPageAndVerifyTitle()
  })

  afterEach('Clear the language preference', async () => {
    await browser.deleteCookies('language')
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
    await validateHrefOfElement(
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

  it('Should verify representative Welsh content and restore English using the language links', async () => {
    await landingPage.selectWelshAndVerifyContent()
    await validateElementVisibleAndText(landingPage.getBackLink(), 'Yn ôl')

    await landingPage.selectEnglishAndVerifyContent()
    await validateElementVisibleAndText(landingPage.getBackLink(), 'Back')
  })

  it('Should retain Welsh layout on Cookies and return to the Welsh homepage', async () => {
    await selectLinkAndVerifyTitle(
      landingPage.getLanguageLink('cy'),
      welshPageHeadingAndTitle
    )

    await selectElement(landingPage.getCookiesFooterLink())
    await waitForPagePath(cookiesPage.pagePath)
    await cookiesPage.verifyFeedbackLink(welshFeedback)
    await validateElementVisibleAndText(
      cookiesPage.getFeedbackBannerText(),
      welshFeedbackBanner
    )
    await validateElementVisibleAndText(cookiesPage.getBackLink(), 'Yn ôl')
    await validateElementVisibleAndText(
      cookiesPage.getHelpFooterText(),
      welshHelpText
    )

    await cookiesPage.selectBackLink()
    await waitForPagePath(landingPage.pagePath)
    await verifyPageTitle(welshPageHeadingAndTitle)
    await validateElementVisibleAndText(
      landingPage.getPageHeading(),
      welshPageHeadingAndTitle
    )
  })
})
