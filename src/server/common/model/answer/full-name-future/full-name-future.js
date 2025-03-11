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
        maxLength: {
          value: 50,
          message: 'First name must be no longer than 50 characters'
        },
        empty: {
          message:
            'Enter the first name of who will be the registered owner of the cattle'
        }
      },
      lastName: {
        maxLength: {
          value: 50,
          message: 'Last name must be no longer than 50 characters'
        },
        empty: {
          message:
            'Enter the last name of who will be the registered owner of the cattle'
        }
      }
    }
  }
}
