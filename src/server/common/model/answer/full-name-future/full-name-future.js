import { FullNameAnswer } from '../full-name/full-name.js'
/** @import {FullNameConfig} from '../full-name/full-name.js' */

/**
 * @augments {FullNameAnswer}
 */
export class FullNameFutureAnswer extends FullNameAnswer {
  /** @type {FullNameConfig} */
  static config = {
    validation: {
      firstName: {
        empty: {
          message:
            'Enter the first name of who will be the registered owner of the animals'
        }
      },
      lastName: {
        empty: {
          message:
            'Enter the last name of who will be the registered owner of the animals'
        }
      }
    }
  }
}
