import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AddressPage extends Page {
  urlPath = '/exotics/movement-destination/address'
}

export const addressPage = new AddressPage()
