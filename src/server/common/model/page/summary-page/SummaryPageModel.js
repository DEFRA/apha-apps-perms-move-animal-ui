import { Page } from '../page-model.js'

/**
 * @import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js'
 * @import { RawApplicationState } from '~/src/server/common/model/state/state-manager.js'
 * @import { Request } from '@hapi/hapi'
 */

class SummaryPage extends Page {
  /**
   * @type {(_data: RawApplicationState, req: [Request]) => SectionModel | Promise<SectionModel>}
   */
  sectionFactory
}

export default SummaryPage
