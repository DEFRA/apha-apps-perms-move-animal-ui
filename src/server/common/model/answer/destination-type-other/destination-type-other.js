import { TextAnswer } from '../text/text.js'

/** @import {TextConfig} from '../text/text.js' */

/**
 * @typedef {{ destinationTypeOther: string }} DestinationTypeOtherPayload
 */

/**
 * @augments {TextAnswer<DestinationTypeOtherPayload>}
 */
export class DestinationTypeOtherAnswer extends TextAnswer {
  /** @type {TextConfig} */
  static config = {
    payloadKey: 'destinationTypeOther',
    characterWidth: 20,
    validation: {
      empty: {
        message: 'Enter the premises type',
        i18nKey: 'tb.destination.destinationTypeOther.validation.empty'
      },
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters',
        i18nKey: 'tb.destination.destinationTypeOther.validation.maxLength'
      }
    }
  }
}
