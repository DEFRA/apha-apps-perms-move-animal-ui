import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class EmailOrPostPage extends Page {
  urlPath = '/exotics/receiving-the-licence/email-or-post'
}

export const emailOrPostPage = new EmailOrPostPage()
