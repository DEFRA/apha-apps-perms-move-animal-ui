import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class LatitudeAndLongitudePage extends Page {
  urlPath = '/exotics/movement-origin/location-details'
}

export const latitudeAndLongitudePage = new LatitudeAndLongitudePage()
