import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class MultipleDatesPage extends Page {
  urlPath = '/exotics/visit-details/multiple-dates'
}

export const multipleDatesPage = new MultipleDatesPage()
