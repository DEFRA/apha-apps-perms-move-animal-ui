import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class MovementOnExitPage extends Page {
  urlPath = '/fmd/about-the-movement-or-activity/movement-on-exit-page'
}

export const movementOnExitPage = new MovementOnExitPage()
