/* eslint-disable lines-between-class-members */
import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const pageId = 'identification-oldest-calf-dob-date-input'
const pageHeadingAndTitle =
  'What is the date of birth of the oldest calf under 42 days old?'

class OldestCalfDOBPage extends Page {
  pagePath = 'identification/oldest-calf-dob'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError = 'Enter the oldest calf’s date of birth'
  noDayError = 'Date of birth of the oldest calf must include a day'
  noMonthError = 'Date of birth of the oldest calf must include a month'
  noYearError = 'Date of birth of the oldest calf must include a year'

  dayFormatError = 'Day of birth must be a real date'
  monthFormatError =
    'Month of birth of the oldest calf must be a number between 1 and 12'
  yearDigitError = 'Year of birth must include 4 numbers'
  yearFormatError = 'Year of birth must be a real date'

  futureDateError =
    'Date of birth of the oldest calf must be today or in the past'

  getDayInput() {
    return super.getInputField(pageId)
  }

  getMonthInput() {
    return super.getInputField(`${pageId}-month`)
  }

  getYearInput() {
    return super.getInputField(`${pageId}-year`)
  }

  inputFieldError() {
    return super.getErrorElement(pageId)
  }

  errorLink() {
    return super.getErrorLink(pageId)
  }

  async dateErrorTest({ day = '', month = '', year = '' }, errorMessage) {
    if (day !== '') {
      await page.typeIntoElement(this.getDayInput(), day)
    }

    if (month !== '') {
      await page.typeIntoElement(this.getMonthInput(), month)
    }

    if (year !== '') {
      await page.typeIntoElement(this.getYearInput(), year)
    }

    await super.verifyErrorsOnPage(this.inputFieldError(), errorMessage)
    await super.verifySummaryErrorLink(this.errorLink(), this.getDayInput())
  }
}

export default new OldestCalfDOBPage()
