import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class TlaOrCphNumberPage extends Page {
  urlPath = '/fmd/movement-destination/TLA-or-tCPH-number'
}

export const tlaOrCphNumberPage = new TlaOrCphNumberPage()
