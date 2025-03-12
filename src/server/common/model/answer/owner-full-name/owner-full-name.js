import { FullNameAnswer } from '../full-name/full-name.js'
/** @import {FullNameConfig} from '../full-name/full-name.js' */

/**
 * @augments {FullNameAnswer}
 */
export class OwnerFullNameAnswer extends FullNameAnswer {
  /** @type {FullNameConfig} */
  static config = {
    validation: {
      firstName: {
        empty: {
          message:
            'Enter the first name of the County Parish Holding (CPH) owner'
        }
      },
      lastName: {
        empty: {
          message:
            'Enter the last name of the County Parish Holding (CPH) owner'
        }
      }
    }
  }
}
