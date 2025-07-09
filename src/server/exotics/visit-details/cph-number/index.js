import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CphNumberPage extends Page {
  urlPath = '/exotics/location-of-visit/cph-number'
}

export const cphNumberPage = new CphNumberPage()
