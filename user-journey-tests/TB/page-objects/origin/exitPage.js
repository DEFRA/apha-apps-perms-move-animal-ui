import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'This service is not available for your movement type'

class ExitPage extends Page {
  pagePath = 'exit-page'
  pageHeading = pageHeadingAndTitle
  pageTitle = pageHeadingAndTitle

  get viewApplicationLink() {
    return $('[data-testid="view-application-link"]')
  }

  async verifyViewApplicationLink() {
    await page.selectLinkAndVerifyTitle(
      this.viewApplicationLink,
      'TB restricted cattle: application for movement licence in England - GOV.UK'
    )
  }
}

export default new ExitPage()
