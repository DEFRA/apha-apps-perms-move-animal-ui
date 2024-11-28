import { Page } from '../page.js'

class EmailPage extends Page {
  get emailPageUrlPath() {
    return '/contact-and-updates/licence-enter-email-address'
  }
}

export default new EmailPage()
