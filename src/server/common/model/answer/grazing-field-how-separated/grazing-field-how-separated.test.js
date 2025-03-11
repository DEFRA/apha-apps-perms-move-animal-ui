import { TextAreaAnswer } from '../text-area/text-area.js'
import { GrazingFieldHowSeparatedAnswer } from './grazing-field-how-separated.js'
/** @import {GrazingFieldHowSeparatedPayload} from './grazing-field-how-separated.js' */

const maxLength = 5000

/** @type {GrazingFieldHowSeparatedPayload} */
const payload = {
  grazingFieldHowSeparated: 'yesterday'
}

describe('GrazingFieldHowSeparated', () => {
  it('should be a text area', () => {
    expect(new GrazingFieldHowSeparatedAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(GrazingFieldHowSeparatedAnswer.config.payloadKey).toBe(
      'grazingFieldHowSeparated'
    )
  })

  it('should be the expected height', () => {
    expect(GrazingFieldHowSeparatedAnswer.config.rows).toBe(8)
  })

  it('should define the right empty input message', () => {
    expect(
      GrazingFieldHowSeparatedAnswer.config.validation.empty?.message
    ).toBe(
      'Enter information about how this grazing field is separated from the resident herd'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(
      GrazingFieldHowSeparatedAnswer.config.validation.maxLength.value
    ).toBe(maxLength)
    expect(
      GrazingFieldHowSeparatedAnswer.config.validation.maxLength.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })
})
