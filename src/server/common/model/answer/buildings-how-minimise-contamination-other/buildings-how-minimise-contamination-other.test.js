import { TextAreaAnswer } from '../text-area/text-area.js'
import { BuildingsHowMinimiseContaminationOtherAnswer } from './buildings-how-minimise-contamination-other.js'
/** @import {BuildingsHowMinimiseContaminationOtherPayload} from './buildings-how-minimise-contamination-other.js' */

const maxLength = 5000

/** @type {BuildingsHowMinimiseContaminationOtherPayload} */
const payload = {
  buildingsHowMinimiseContaminationOther: 'some other measure'
}

describe('BuildingsHowMinimiseContaminationOtherAnswer', () => {
  it('should be a text area', () => {
    expect(
      new BuildingsHowMinimiseContaminationOtherAnswer(payload)
    ).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(
      BuildingsHowMinimiseContaminationOtherAnswer.config.payloadKey
    ).toBe('buildingsHowMinimiseContaminationOther')
  })

  it('should have the right number of rows', () => {
    expect(BuildingsHowMinimiseContaminationOtherAnswer.config.rows).toBe(8)
  })

  it('should not be a page heading', () => {
    expect(
      BuildingsHowMinimiseContaminationOtherAnswer.config.isPageHeading
    ).toBe(false)
  })

  it('should define the right empty input message', () => {
    expect(
      BuildingsHowMinimiseContaminationOtherAnswer.config.validation.empty
        ?.message
    ).toBe(
      'Enter what other measures are being taken to reduce the spread of TB during housing'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(
      BuildingsHowMinimiseContaminationOtherAnswer.config.validation.maxLength
        .value
    ).toBe(maxLength)
    expect(
      BuildingsHowMinimiseContaminationOtherAnswer.config.validation.maxLength
        .message
    ).toBe('Your answer must be no longer than 5000 characters')
  })
})
