import { QuestionPage } from '../page/question-page-model.js'
import { SectionModel } from './section-model.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

class DestinationPagePlaceholder extends QuestionPage {
  _logger = createLogger()

  urlPath = '#'

  constructor() {
    super()
    this._logger.warn(
      'DestinationPagePlaceholder is not implemented and uses a placeholder'
    )
  }
}

export class Destination extends SectionModel {
  title = 'Movement destination'
  initialPage = new DestinationPagePlaceholder()
  summaryPageLink = '/destination/summary'
  isEnabled = false

  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {Destination}
   */
  static fromState() {
    const instance = new Destination()
    instance.seal()
    return instance
  }
}
