import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model.js'
import { uploadPlanPage } from '~/src/server/tb/biosecurity-map/upload-plan/index.js'
import { biosecurityPlan } from '~/src/server/tb/biosecurity-map/index.js'
import { biosecuritySectionIsVisible } from '../../common/model/section/visibility.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class BiosecurityPlanSection extends SectionModelV1 {
  /** @type {SectionConfig} */
  static config = {
    key: 'biosecurity-map',
    title: 'Biosecurity map',
    plugin: biosecurityPlan,
    summaryLink: '/biosecurity-map/check-answers',
    isEnabled: () => true,
    isVisible: biosecuritySectionIsVisible
  }

  static firstPageFactory = () => uploadPlanPage
}
