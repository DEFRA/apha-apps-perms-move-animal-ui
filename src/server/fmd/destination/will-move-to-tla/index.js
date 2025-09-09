import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class WillMoveToTlaPage extends Page {
  urlPath = '/fmd/movement-destination/TLA-yes-no'
}

export const willMoveToTlaPage = new WillMoveToTlaPage()
