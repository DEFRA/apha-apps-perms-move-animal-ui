import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AddressPage extends Page {
  urlPath = '/exotics/location-of-visit/address'
}

export const addressPage = new AddressPage()
