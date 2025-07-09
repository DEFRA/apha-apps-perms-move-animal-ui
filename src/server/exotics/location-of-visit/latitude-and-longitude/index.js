import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class LatitudeAndLongitudePage extends Page {
  urlPath = '/exotics/location-of-visit/location-details'
}

export const latitudeAndLongitudePage = new LatitudeAndLongitudePage()
