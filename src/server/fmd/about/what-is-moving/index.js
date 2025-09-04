import { ExitPage } from '~/src/server/common/model/page/exit-page-model.js'

// STUB PAGE
export class WhatIsMovingPage extends ExitPage {
  urlPath = '/fmd/about-the-movement-or-activity/what-is-moving'
}

export const whatIsMovingPage = new WhatIsMovingPage()
