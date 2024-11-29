import { $ } from '@wdio/globals'

import { Page } from './page.js'
import * as page from '../helpers/page.js'

class LandingPage extends Page {
  get landingPageUrl() {
    return '/'
  }

  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  get landingPageTitleText() {
    return 'Apply for a Bovine Tuberculosis (TB) movement licence'
  }

  async verifyStartNowButton(text, click = false) {
    await page.validateElementVisibleAndText(this.startNowButton, text)
    if (click) {
      await page.selectElement(this.startNowButton)
    }
  }
}

export default new LandingPage()
