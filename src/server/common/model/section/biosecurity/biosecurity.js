import { keptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { biosecurity } from '~/src/server/biosecurity/index.js'

/**
 * export @typedef {{
 * keptSeparately: YesNoRadioButtonData | undefined;
 * grazing: YesNoRadioButtonData | undefined;
 * }} BiosecurityData
 * @import {YesNoRadioButtonData} from '../../answer/yes-no-radio-button/yes-no-radio-button.js'
 */
export class BiosecuritySection extends SectionModel {
  static config = {
    key: 'biosecurity',
    title: 'Biosecurity details',
    plugin: biosecurity,
    summaryLink: '/biosecurity/check-answers',
    isEnabled: () => true,
    isVisible: config.get('featureFlags')?.biosecurity
  }

  static firstPageFactory = () => keptSeparatelyPage

  /**
   * @param {BiosecurityData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
