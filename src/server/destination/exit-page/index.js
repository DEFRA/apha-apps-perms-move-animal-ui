import { Page } from '../../common/model/page/page-model.js'

export class DestinationExitPage extends Page {
  urlPath = '/destination/can-not-use-service'
  overrideRedirects = true
}
export const destinationExitPage = new DestinationExitPage()
