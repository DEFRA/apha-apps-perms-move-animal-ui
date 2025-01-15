import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageHeadingAndTitle =
  'This service does not currently send licences by post'

class PostExitPage extends Page {
  pagePath =
    '/receiving-the-licence/licence-select-post-can-not-use-this-service'

  pageHeading = pageHeadingAndTitle

  pageTitle = pageHeadingAndTitle

  get completePaperApplicationLink() {
    return $('[data-testid="complete-application-link"]')
  }

  get continueWithEmailButton() {
    return $('#continue-button')
  }

  async verifyCompletePaperApplicationLink() {
    await page.selectLinkAndVerifyTitle(
      this.completePaperApplicationLink,
      'TB restricted cattle: application for movement licence in England - GOV.UK'
    )
  }

  async verifyContinueWithEmailButton() {
    await page.selectLinkAndVerifyTitle(
      this.continueWithEmailButton,
      'What email address would you like the licence sent to?'
    )
  }
}

export default new PostExitPage()
