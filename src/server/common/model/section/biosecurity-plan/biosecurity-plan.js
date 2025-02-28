import { uploadPlanPage } from '~/src/server/biosecurity-map/upload-plan/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { biosecurityPlan } from '~/src/server/biosecurity-map/index.js'
import { biosecuritySectionIsVisible } from '../visibility.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class BiosecurityPlanSection extends SectionModel {
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
