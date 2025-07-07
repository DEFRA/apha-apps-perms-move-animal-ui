import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class StubPage extends Page {
  urlPath = 'stub'
}

export const stubPage = new StubPage()
