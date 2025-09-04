import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class SlaughterStubPage extends Page {
  urlPath = '/fmd/slaughter-information/stub'
}

export const slaughterStubPage = new SlaughterStubPage()
