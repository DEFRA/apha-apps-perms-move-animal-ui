import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DatePage extends Page {
  urlPath = '/exotics/movement-details/date'
}

export const datePage = new DatePage()
