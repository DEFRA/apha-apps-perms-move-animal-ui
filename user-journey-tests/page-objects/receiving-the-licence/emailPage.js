import { $ } from '@wdio/globals'

import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

class EmailPage extends Page {
  get emailPageUrlPath() {
    return '/contact-and-updates/licence-enter-email-address'
  }
}

export default new EmailPage()
