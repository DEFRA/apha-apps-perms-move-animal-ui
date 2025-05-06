import { Page } from '../page-objects/page.js'

class SubmissionConfirmationPage extends Page {
  pagePath = '/submit/confirmation'
  pageTitle = 'Your animal disease movement licence application'
  pageHeading = 'Application submitted'

  get slaText() {
    return $('[data-testid="sla-text"]')
  }

  get referenceNumberElement() {
    return $('div.govuk-panel__body')
  }

  async getReferenceNumber() {
    const text = await this.referenceNumberElement.getText()
    const match = text.match(/TB-[A-Z0-9]{4}-[A-Z0-9]{4}/)

    if (!match) {
      throw new Error('Reference number not found on confirmation page')
    }

    return match[0]
  }
}

export default new SubmissionConfirmationPage()
