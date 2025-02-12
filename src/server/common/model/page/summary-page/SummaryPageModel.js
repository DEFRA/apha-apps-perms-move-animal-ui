import { Page } from '../page-model.js'

/** @import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import { RawSectionState, RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

class SummaryPage extends Page {
  /**
   * @type {(_data: RawApplicationState) => SectionModel}
   */
  sectionFactory
}

export default SummaryPage
