import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class HasACphNumberPage extends Page {
  urlPath = '/exotics/movement-destination/cph-yes-no'
}

export const hasACphNumberPage = new HasACphNumberPage()
