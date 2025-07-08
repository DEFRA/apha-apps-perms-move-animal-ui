import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class OriginAddressPage extends Page {
  urlPath = '/exotics/movement-origin/address'
}

export const originAddressPage = new OriginAddressPage()
