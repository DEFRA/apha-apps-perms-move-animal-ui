import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class NumberOfAnimalsPage extends Page {
  urlPath = '/fmd/about-the-movement-or-activity/number-of-animals'
}

export const numberOfAnimalsPage = new NumberOfAnimalsPage()
