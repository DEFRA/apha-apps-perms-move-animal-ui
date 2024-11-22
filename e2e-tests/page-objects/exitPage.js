import { $ } from '@wdio/globals'

import { Page } from '../page-objects/page.js'

class ExitPage extends Page {
  get exitPageHeading() {
    return 'This service is not available for your movement type'
  }

  get exitPageTitle() {
    return 'This service is not available for your movement type'
  }

  get exitPageUrlPath() {
    return 'exit-page'
  }

  get viewApplicationLink() {
    return $('[data-testid="view-application-link"]')
  }

  get govUkLink() {
    return $('[data-testid="gov-uk-link"]')
  }

  async verifyViewApplicationLink() {
    await super.selectElement(this.viewApplicationLink)
    const title = await browser.getTitle()
    if (
      title !==
      'TB restricted cattle: application for movement licence in England - GOV.UK'
    ) {
      throw new Error(`Unexpected title: ${title}`)
    }
  }

  async verifyGovUkLink() {
    await super.selectElement(this.govUkLink)
    const title = await browser.getTitle()
    if (title !== 'Welcome to GOV.UK') {
      throw new Error(`Unexpected title: ${title}`)
    }
  }
}

export default new ExitPage()
