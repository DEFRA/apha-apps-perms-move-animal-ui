import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class ProductLocationHasACphNumberPage extends Page {
  urlPath = '/exotics/movement-origin/product-location/cph-yes-no'
}

export const productLocationHasACphNumberPage =
  new ProductLocationHasACphNumberPage()
