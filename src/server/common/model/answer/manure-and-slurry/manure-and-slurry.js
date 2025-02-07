import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} ManureAndSlurryData
 * @typedef {{ manureAndSlurry: ManureAndSlurryData }} ManureAndSlurryPayload
 */

/**
 * @augments {RadioButtonAnswer<ManureAndSlurryPayload>}
 */
export class ManureAndSlurryAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'manureAndSlurry',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText:
        'Select if manure or slurry has been put on the grazing field in the past 60 days'
    },
    layout: 'inline'
  }
}
