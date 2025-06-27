import { licence } from '~/src/server/tb/licence/index.js'
import { TbSectionModel } from '../../../../tb/section-model.js'
import { fullNamePage } from '~/src/server/tb/licence/full-name/index.js'
import { fullNameFuturePage } from '~/src/server/tb/licence/full-name-future/index.js'

/** @import {SectionConfig} from '../../../../tb/section-model.js' */

export class LicenceSection extends TbSectionModel {
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
