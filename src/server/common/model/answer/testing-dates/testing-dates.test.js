import { TextAreaAnswer } from '../text-area/text-area.js'
import { TestingDatesAnswer } from './testing-dates.js'
/** @import {TestingDatesPayload} from './testing-dates.js' */

const maxLength = 5000

/** @type {TestingDatesPayload} */
const payload = {
  testingDates: 'somehow'
}

describe('TestingDates', () => {
  it('should be a text area', () => {
    expect(new TestingDatesAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(TestingDatesAnswer.config.payloadKey).toBe('testingDates')
  })

  it('should have the right number of rows', () => {
    expect(TestingDatesAnswer.config.rows).toBe(5)
  })

  it('should not be a page heading', () => {
    expect(TestingDatesAnswer.config.isPageHeading).toBe(false)
  })

  it('should define the right empty input message', () => {
    expect(TestingDatesAnswer.config.validation.empty?.message).toBe(
      'Enter the dates when animals over 42 days old were last tested for TB'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(TestingDatesAnswer.config.validation.maxLength.value).toBe(maxLength)
    expect(TestingDatesAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})
