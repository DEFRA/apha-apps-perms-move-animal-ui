import { Page } from '~/src/server/common/model/page/page-model.js'

export class FiftyPercentWarningPage extends Page {
  urlPath = '/origin/fifty-percent-warning'
  sectionKey = 'origin'
}

export const fiftyPercentWarningPage = new FiftyPercentWarningPage()
