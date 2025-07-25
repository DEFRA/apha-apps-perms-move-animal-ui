import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} BuildingsAnySharedData
 * @typedef {{ animalsHoused: BuildingsAnySharedData }} BuildingsAnySharedPayload
 */

/**
 * @augments {RadioButtonAnswer<BuildingsAnySharedPayload>}
 */
export class BuildingsAnySharedAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'animalsHoused',
    hint: 'This includes shared spaces such as pens',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    validation: {
      empty: 'Select if the animals will be housed'
    },
    layout: 'inline'
  }
}
