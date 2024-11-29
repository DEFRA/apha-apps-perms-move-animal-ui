import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ExitPage extends Page {
  get pageHeading() {
    return pageHeadingAndTitle
  }

  get pageTitle() {
    return pageHeadingAndTitle
  }

  get pagePath() {
    return 'exit-page'
  }

  get viewApplicationLink() {
    return $('[data-testid="view-application-link"]')
  }

  get govUkLink() {
    return $('[data-testid="gov-uk-link"]')
  }

  async verifyViewApplicationLink() {
    await page.selectLinkAndVerifyTitle(
      this.viewApplicationLink,
      'TB restricted cattle: application for movement licence in England - GOV.UK'
    )
  }

  async verifyGovUkLink() {
    await page.selectLinkAndVerifyTitle(this.govUkLink, 'Welcome to GOV.UK')
  }
}

export default new ExitPage()
