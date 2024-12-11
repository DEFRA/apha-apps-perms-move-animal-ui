import { QuestionPage } from '../page/question-page-model.js'
import { SectionModel } from './section-model.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

class TestsPagePlaceholder extends QuestionPage {
  _logger = createLogger()

  urlPath = '#'

  constructor() {
    super()
    this._logger.warn(
      'TestsPagePlaceholder is not implemented and uses a placeholder'
    )
  }
}

export class Tests extends SectionModel {
  title = 'Tests'
  initialPage = new TestsPagePlaceholder()
  summaryPageLink = '/destination/summary'
  isEnabled = true

  validate() {
    return { isValid: false, result: {} }
  }

  /**
   * @returns {Tests}
   */
  static fromState() {
    const instance = new Tests()
    instance.seal()
    return instance
  }
}
