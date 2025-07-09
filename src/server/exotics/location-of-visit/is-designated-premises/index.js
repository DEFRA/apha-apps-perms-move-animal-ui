import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class IsDesignatedPremisesPage extends Page {
  urlPath = '/exotics/location-of-visit/designated-premise'
}

export const isDesignatedPremisesPage = new IsDesignatedPremisesPage()
