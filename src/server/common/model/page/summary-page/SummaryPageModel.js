import { Page } from '../page-model.js'

/** @import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js' */

class SummaryPage extends Page {
  /** @type {(_data) => SectionModel} */
  sectionFactory
}

export default SummaryPage
