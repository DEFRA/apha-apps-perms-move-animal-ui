import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ testingDates: string }} TestingDatesPayload
 */

/**
 * @augments {TextAreaAnswer<TestingDatesPayload>}
 */
export class TestingDatesAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'testingDates',
    rows: 5,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter the dates when cattle over 42 days old were last tested for TB'
      }
    }
  }
}
