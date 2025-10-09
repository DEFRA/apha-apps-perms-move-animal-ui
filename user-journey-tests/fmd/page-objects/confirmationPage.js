import { Page } from '../../TB/page-objects/page.js'

class ConfirmationPage extends Page {
  pagePath = 'fmd/submit/confirmation'
  pageTitle = 'Your animal disease movement licence application'
  pageHeading = 'Application submitted'

  get slaText() {
    return $('[data-testid="sla-text"]')
  }
}

export default new ConfirmationPage()
