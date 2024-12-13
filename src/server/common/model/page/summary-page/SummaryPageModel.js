import { Page } from '../page-model.js'

/** @import { SectionModel } from '~/src/server/common/model/section/section-model/index.js' */

class SummaryPage extends Page {
  /** @type {(_data) => SectionModel} */
  factory

  /** @type {string} */
  heading

  /** @type {string} */
  pageTitle
}

export default SummaryPage
