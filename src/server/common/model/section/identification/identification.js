import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { identification } from '~/src/server/identification/index.js'
import { earTagsPage } from '~/src/server/identification/ear-tags/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class IdentificationSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'identification',
    title: 'Animal identifiers',
    plugin: identification,
    summaryLink: '/identification/check-answers',
    isEnabled: () => true,
    isVisible: config.get('featureFlags')?.biosecurity
  }

  static firstPageFactory = () => earTagsPage
}
