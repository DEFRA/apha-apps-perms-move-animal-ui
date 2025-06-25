import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

export class NotImplementedPage extends ExitPage {
  pageHeading = 'Not Implemented'
  urlPath = '/exotics/not-implemented'
}

export const notImplementedPage = new NotImplementedPage()
