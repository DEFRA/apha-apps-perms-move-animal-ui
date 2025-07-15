import { TextAreaAnswer } from '../text-area/text-area.js'
import { AdditionalInfoAnswer } from './additional-info.js'
/** @import {AdditionalInfoPayload} from './additional-info.js' */

const maxLength = 5000

/** @type {AdditionalInfoPayload} */
const payload = {
  additionalInfo: 'yesterday'
}

describe('AdditionalInfo', () => {
  it('should be a text area', () => {
    expect(new AdditionalInfoAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(AdditionalInfoAnswer.config.payloadKey).toBe('additionalInfo')
  })

  it('should have the right number of rows', () => {
    expect(AdditionalInfoAnswer.config.rows).toBe(10)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(AdditionalInfoAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(AdditionalInfoAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should not specify an empty validation message', () => {
    expect(AdditionalInfoAnswer.config.validation.empty).toBeUndefined()
  })
})
