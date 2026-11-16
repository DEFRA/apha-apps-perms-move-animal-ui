import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'

const pageHeadingAndTitle = 'Move animals under disease controls'
const welshPageHeadingAndTitle = 'Symud anifeiliaid dan reolaethau clefydau'

class LandingPage extends Page {
  pagePath = '/'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  get introText() {
    return $('[data-testid="app-page-body"] > p')
  }

  async verifyExternalLinks() {
    return $$('a[href*="https://www.gov.uk"]')
  }

  async selectWelshAndVerifyContent() {
    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('cy'),
      welshPageHeadingAndTitle
    )
    await page.validateElementVisibleAndText(
      this.getPageHeading(),
      welshPageHeadingAndTitle
    )
    await this.verifyStartNowButton('Dechrau nawr')
    await page.validateElementVisibleAndText(
      this.introText,
      'Defnyddiwch y gwasanaeth hwn i wneud cais am drwydded symud TB.'
    )
    await this.verifyFeedbackLink('rhoi eich adborth (yn agor mewn tab newydd)')
    await page.validateElementVisibleAndText(
      this.getFeedbackBannerText(),
      "Mae hwn yn wasanaeth newydd. Helpwch ni i'w wella a rhoi eich adborth (yn agor mewn tab newydd)."
    )
    await page.validateElementVisibleAndText(
      this.getHelpFooterText(),
      "Os oes angen help arnoch gyda'r gwasanaeth gallwch ffonio 03000 200 301."
    )
  }

  async selectEnglishAndVerifyContent() {
    await page.selectLinkAndVerifyTitle(
      this.getLanguageLink('en'),
      this.pageTitle
    )
    await this.verifyPageHeadingAndTitle()
    await this.verifyStartNowButton('Start now')
    await page.validateElementVisibleAndText(
      this.introText,
      'Use this service to apply for a TB movement licence.'
    )
    await this.verifyFeedbackLink('give your feedback (opens in new tab)')
    await page.validateElementVisibleAndText(
      this.getFeedbackBannerText(),
      'This is a new service. Help us improve it and give your feedback (opens in new tab).'
    )
    await page.validateElementVisibleAndText(
      this.getHelpFooterText(),
      'If you need help with the service you can call 03000 200 301.'
    )
  }

  async verifyStartNowButton(text, click = false) {
    await page.validateElementVisibleAndText(this.startNowButton, text)
    if (click) {
      await page.selectElement(this.startNowButton)
    }
  }
}

export default new LandingPage()
