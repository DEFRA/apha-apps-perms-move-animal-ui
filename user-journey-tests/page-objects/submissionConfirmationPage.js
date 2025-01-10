import { Page } from '../page-objects/page.js'

class SubmissionConfirmationPage extends Page {
  pagePath = '/submit/confirmation'
  pageTitle = 'Your animal disease movement licence application'
  pageHeading = 'Application complete'

  get slaText() {
    return $('[data-testid="sla-text"]')
  }
}

export default new SubmissionConfirmationPage()
