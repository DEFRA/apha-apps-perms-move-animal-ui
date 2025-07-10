import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CphNumberPage extends Page {
  urlPath = '/exotics/movement-destination/cph-number'
}

export const cphNumberPage = new CphNumberPage()
