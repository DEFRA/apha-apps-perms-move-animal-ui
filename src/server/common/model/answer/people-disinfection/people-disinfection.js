import { TextAreaAnswer } from '../text-area/text-area.js'

/** @import {TextAreaConfig} from '../text-area/text-area.js' */

/**
 * @typedef {{ peopleDisinfection: string }} PeopleDisinfectionPayload
 */

/**
 * @augments {TextAreaAnswer<PeopleDisinfectionPayload>}
 */
export class PeopleDisinfectionAnswer extends TextAreaAnswer {
  /** @type {TextAreaConfig} */
  static config = {
    payloadKey: 'peopleDisinfection',
    rows: 8,
    isPageHeading: false,
    validation: {
      maxLength: {
        value: 5000,
        message: 'Your answer must be no longer than 5000 characters'
      },
      empty: {
        message:
          'Enter what measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle'
      }
    }
  }
}
