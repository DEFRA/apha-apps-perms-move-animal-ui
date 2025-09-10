import { Page } from '~/src/server/common/model/page/page-model.js'

// STUB PAGE
export class DestinationHasACphNumberPage extends Page {
  urlPath = '/fmd/movement-destination/cph-number-yes-no'
}

export const destinationHasACphNumberPage = new DestinationHasACphNumberPage()
