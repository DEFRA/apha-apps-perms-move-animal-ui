import { Page } from '../page-model.js'

/** @import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model.js' */
/** @import { RawSectionState, RawApplicationState } from '~/src/server/common/model/state/state-manager.js' */

class SummaryPage extends Page {
  /**
   * @type {(_data: RawApplicationState) => SectionModelV1}
   */
  sectionFactory
}

export default SummaryPage
