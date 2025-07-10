import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class EmailPage extends Page {
  urlPath = '/exotics/receiving-the-licence/enter-email-address'
}

export const emailPage = new EmailPage()
