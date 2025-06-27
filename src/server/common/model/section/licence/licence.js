import { licence } from '~/src/server/tb/licence/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { fullNamePage } from '~/src/server/tb/licence/full-name/index.js'
import { fullNameFuturePage } from '~/src/server/tb/licence/full-name-future/index.js'

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

  static firstPageFactory = (applicationState) => {
    if (applicationState?.origin?.onOffFarm === 'off') {
      return fullNamePage
    }
    return fullNameFuturePage
  }
}
