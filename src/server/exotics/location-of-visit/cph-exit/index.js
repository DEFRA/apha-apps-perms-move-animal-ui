import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CphExitPage extends Page {
  urlPath = '/exotics/location-of-visit/cph-needed'
}

export const cphExitPage = new CphExitPage()
