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
            'Enter the first name of the person who will be the registered keeper of the animals',
          i18nKey: 'tb.licence.fullNameFuture.validation.firstName.empty'
        }
      },
      lastName: {
        empty: {
          message:
            'Enter the last name of the person who will be the registered keeper of the animals',
          i18nKey: 'tb.licence.fullNameFuture.validation.lastName.empty'
        }
      }
    }
  }
}
