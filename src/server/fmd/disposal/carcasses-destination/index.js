import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CarcassesDestinationPage extends Page {
  urlPath = '/fmd/disposal-of-animals/carcasses-premises-type'
}

export const carcassesDestinationPage = new CarcassesDestinationPage()
