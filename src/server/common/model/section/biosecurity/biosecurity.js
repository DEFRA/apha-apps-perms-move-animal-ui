import { SectionModel } from '../section-model/section-model.js'
import { biosecurity } from '~/src/server/tb/biosecurity/index.js'
import { biosecuritySectionIsVisible } from '../visibility.js'
import { obligationsPage } from '~/src/server/tb/biosecurity/obligations/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class BiosecuritySection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'biosecurity',
    title: 'Biosecurity details',
    plugin: biosecurity,
    summaryLink: '/biosecurity/check-answers',
    isEnabled: () => true,
    isVisible: biosecuritySectionIsVisible
  }

  static firstPageFactory = () => obligationsPage
}
