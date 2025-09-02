import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { FieldParcelNumberAnswer } from './field-parcel-number.js'
/** @import {FieldParcelNumberPayload} from './field-parcel-number.js' */

const maxLength = 100

/** @type {FieldParcelNumberPayload} */
const payload = {
  fieldParcelNumber: 'some number'
}

describe('FieldParcelNumberAnswer', () => {
  it('should be a text input', () => {
    expect(new FieldParcelNumberAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(FieldParcelNumberAnswer.config.payloadKey).toBe('fieldParcelNumber')
  })

  it('should have isPageHeading set to false', () => {
    expect(FieldParcelNumberAnswer.config.isPageHeading).toBe(false)
  })

  it('should have spellCheck set to false', () => {
    expect(FieldParcelNumberAnswer.config.spellcheck).toBe(false)
  })

  it('should have characterWidth set to 20', () => {
    expect(FieldParcelNumberAnswer.config.characterWidth).toBe(20)
  })

  it('should define the right empty input message', () => {
    expect(FieldParcelNumberAnswer.config.validation.empty?.message).toBe(
      'Enter the field parcel number'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(FieldParcelNumberAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(FieldParcelNumberAnswer.config.validation.maxLength?.message).toBe(
      `Your answer must be no longer than ${maxLength} characters`
    )
  })
})
