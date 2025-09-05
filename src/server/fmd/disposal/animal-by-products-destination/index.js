import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class AnimalByProductsDestinationPage extends Page {
  urlPath = '/fmd/disposal-of-animals/ABP-premises-type'
}

export const animalByProductsDestinationPage =
  new AnimalByProductsDestinationPage()
