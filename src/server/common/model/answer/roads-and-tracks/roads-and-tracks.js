import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} RoadsAndTracksData
 * @typedef {{ roadsAndTracks: RoadsAndTracksData }} RoadsAndTracksPayload
 */

/**
 * @augments {RadioButtonAnswer<RoadsAndTracksPayload>}
 */
export class RoadsAndTracksAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'roadsAndTracks',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText:
        'Select if the incoming cattle come into contact with any roads or tracks used by the existing cattle'
    },
    layout: 'inline'
  }
}
