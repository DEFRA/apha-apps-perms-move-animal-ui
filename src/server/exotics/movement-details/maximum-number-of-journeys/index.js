import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class MaximumNumberOfJourneysPage extends Page {
  urlPath = '/exotics/movement-details/maximum-number-of-journeys'
}

export const maximumNumberOfJourneysPage = new MaximumNumberOfJourneysPage()
