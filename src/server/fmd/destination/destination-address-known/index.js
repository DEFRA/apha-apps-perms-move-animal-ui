import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DestinationAddressKnownPage extends Page {
  urlPath = '/fmd/movement-destination/business-address-yes-no'
}

export const destinationAddressKnownPage = new DestinationAddressKnownPage()
