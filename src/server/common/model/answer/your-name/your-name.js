import { FullNameAnswer } from '../full-name/full-name.js'
/** @import {FullNameConfig} from '../full-name/full-name.js' */

/**
 * @augments {FullNameAnswer}
 */
export class YourNameAnswer extends FullNameAnswer {
  /** @type {FullNameConfig} */
  static config = {
    validation: {
      firstName: {
        empty: {
          message: 'Enter your first name'
        }
      },
      lastName: {
        empty: {
          message: 'Enter your last name'
        }
      }
    }
  }
}
