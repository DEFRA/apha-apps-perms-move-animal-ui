import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'

/** @import { FullNameConfig } from "~/src/server/common/model/answer/full-name/full-name.js" */

export class LicenceFullNameAnswer extends FullNameAnswer {
  /** @type { FullNameConfig } */
  static config = {
    explanation: 'This is the person we will issue the licence to.',
    validation: {
      firstName: {
        empty: {
          message: 'Enter a first name'
        }
      },
      lastName: {
        empty: {
          message: 'Enter a last name'
        }
      }
    }
  }
}
