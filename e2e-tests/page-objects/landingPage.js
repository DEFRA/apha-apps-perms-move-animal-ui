import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page.js'

class LandingPage extends Page {
  get startNowButton() {
    return $('[data-testid="start-now-btn"]')
  }

  get landingPageTitleText() {
    return 'Apply for a Bovine Tuberculosis (TB) ___ movement licence'
  }

  async verifyStartNowButton(text, click = false) {
    await super.validateElementVisibleAndText(this.startNowButton, text)
    if (click) {
      await super.selectElement(this.startNowButton)
    }
  }
}

export default new LandingPage()
