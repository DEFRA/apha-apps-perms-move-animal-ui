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
          'Enter what measures are staff taking to reduce the risk of spreading TB from the resident cattle'
      }
    }
  }
}
