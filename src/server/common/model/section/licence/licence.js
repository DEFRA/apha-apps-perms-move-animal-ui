import { licence } from '~/src/server/licence/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { fullNamePage } from '~/src/server/licence/fullName/index.js'

/** @import {SectionConfig} from '../section-model/section-model.js' */

export class LicenceSection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'licence',
    title: 'Receiving the licence',
    plugin: licence,
    summaryLink: '/receiving-the-licence/check-answers',
    isEnabled: () => true,
    isVisible: () => true
  }

  static firstPageFactory = () => fullNamePage
}
