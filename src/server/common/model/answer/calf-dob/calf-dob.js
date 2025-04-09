import { DateAnswer } from '../date/date.js'

/** @import {DateConfig} from '../date/date.js' */

export class CalfDob extends DateAnswer {
  /** @type {DateConfig} */
  static config = {
    isPageHeading: true,
    validation: {
      missingDate: { message: 'Enter the oldest calf’s date of birth' },
      missingDay: {
        message: 'Date of birth of the oldest calf must include a day'
      },
      missingMonth: {
        message: 'Date of birth of the oldest calf must include a month'
      },
      missingYear: {
        message: 'Date of birth of the oldest calf must include a year'
      },
      invalidDay: { message: 'Day of birth must be a real date' },
      invalidMonth: {
        message:
          'Month of birth of the oldest calf must be a number between 1 and 12'
      },
      invalidYear: { message: 'Year of birth must be a real date' },
      yearPattern: {
        message: 'Year of birth must include 4 numbers',
        pattern: /^\d{4}$/
      },
      invalidDate: { message: 'Day of birth must be a real date' },
      futureDate: {
        message: 'Date of birth of the oldest calf must be today or in the past'
      }
    }
  }
}
