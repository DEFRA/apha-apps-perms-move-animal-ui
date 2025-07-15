import { TextAnswer } from '../text/text.js'
import { DestinationTypeOtherAnswer } from './destination-type-other.js'
/** @import {DestinationTypeOtherPayload} from './destination-type-other.js' */

const maxLength = 5000

/** @type {DestinationTypeOtherPayload} */
const payload = {
  destinationTypeOther: 'other destination type'
}

describe('DestinationTypeOther', () => {
  it('should be a text answer', () => {
    expect(new DestinationTypeOtherAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(DestinationTypeOtherAnswer.config.payloadKey).toBe(
      'destinationTypeOther'
    )
  })

  it('should have the right number of rows', () => {
    expect(DestinationTypeOtherAnswer.config.characterWidth).toBe(20)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(DestinationTypeOtherAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(
      DestinationTypeOtherAnswer.config.validation.maxLength?.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })

  it('should not specify an empty validation message', () => {
    expect(DestinationTypeOtherAnswer.config.validation.empty?.message).toBe(
      'Enter the premises type'
    )
  })
})
