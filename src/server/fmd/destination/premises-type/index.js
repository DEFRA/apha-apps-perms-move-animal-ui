import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class PremisesTypePage extends Page {
  urlPath = '/fmd/movement-destination/premises-type'
}

export const premisesTypePage = new PremisesTypePage()
