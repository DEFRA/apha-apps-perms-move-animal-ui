import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class CarcassesDestinationTypePage extends Page {
  urlPath = '/fmd/movement-destination/type'
}

export const carcassesDestinationTypePage = new CarcassesDestinationTypePage()
