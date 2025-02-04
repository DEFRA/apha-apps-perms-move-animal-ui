import { keptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'
import { SectionModel } from '../section-model/section-model.js'

/**
 * export @typedef {{
 * keptSeparately: KeptSeparatelyData | undefined;
 * }} BiosecurityData
 * @import {KeptSeparatelyData} from '../../answer/kept-separately/kept-separately.js'
 */
export class BiosecuritySection extends SectionModel {
  static config = {
    title: 'Biosecurity details',
    summaryLink: '/biosecurity/check-answers',
    isEnabled: () => true
  }

  static firstPageFactory = () => keptSeparatelyPage

  /**
   * @param {BiosecurityData | undefined} data
   */
  static fromState(data) {
    return SectionModel.fromState.call(this, data)
  }
}
