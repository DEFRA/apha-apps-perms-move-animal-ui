import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/** @type {RadioButtonConfig} */
const onOffFarmConfig = {
  payloadKey: 'onOffFarm',
  options: {
    on: {
      label: 'On to the farm or premises',
      labelI18nKey: 'tb.origin.onOffFarm.options.on.label'
    },
    off: {
      label: 'Off the farm or premises',
      labelI18nKey: 'tb.origin.onOffFarm.options.off.label'
    }
  },
  validation: {
    empty: 'Select if you are moving animals on or off your farm or premises'
  }
}

/**
 * export @typedef {'on' | 'off'} OnOffFarmData
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 */

/** @augments {RadioButtonAnswer<OnOffFarmPayload>} */
export class OnOffFarmAnswer extends RadioButtonAnswer {
  static config = onOffFarmConfig
}
