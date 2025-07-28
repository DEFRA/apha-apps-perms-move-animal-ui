import { Page } from './page.js'

class SubmissionConfirmationPage extends Page {
  pagePath = 'tb/submit/confirmation'
  pageTitle = 'Your animal disease movement licence application'
  pageHeading = 'Application submitted'

  get slaText() {
    return $('[data-testid="sla-text"]')
  }
}

export default new SubmissionConfirmationPage()
