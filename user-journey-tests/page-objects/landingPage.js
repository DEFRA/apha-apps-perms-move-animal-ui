import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'

const pageHeadingAndTitle =
  'Apply for a Bovine Tuberculosis (TB) movement licence'

class LandingPage extends Page {
  pagePath = '/'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  async verifyStartNowButton(text, click = false) {
    await page.validateElementVisibleAndText(this.startNowButton, text)
    if (click) {
      await page.selectElement(this.startNowButton)
    }
  }
}

export default new LandingPage()
