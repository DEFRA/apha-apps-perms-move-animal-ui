import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class EmailAddressPage extends Page {
  urlPath = '/fmd/receiving-the-licence/email-address'
}

export const emailAddressPage = new EmailAddressPage()
