import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DestinationBusinessNamePage extends Page {
  urlPath = '/fmd/disposal-of-animals/destination-business-name'
}

export const destinationBusinessNamePage = new DestinationBusinessNamePage()
