import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class HasACphNumberPage extends Page {
  urlPath = '/exotics/location-of-visit/cph-yes-no'
}

export const hasACphNumberPage = new HasACphNumberPage()
