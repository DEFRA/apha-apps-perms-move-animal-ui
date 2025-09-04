import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class MoveToSlaughterPage extends Page {
  urlPath = '/fmd/about-the-movement-or-activity/slaughter-yes-no'
}

export const moveToSlaughterPage = new MoveToSlaughterPage()
