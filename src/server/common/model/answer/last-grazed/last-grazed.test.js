import { TextAnswer } from '../text/text.js'
import { LastGrazedAnswer } from './last-grazed.js'
/** @import {LastGrazedPayload} from './last-grazed.js' */

const maxLength = 5000

/** @type {LastGrazedPayload} */
const payload = {
  lastGrazed: 'yesterday'
}

describe('LastGrazed', () => {
  it('should be a text input', () => {
    expect(new LastGrazedAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(LastGrazedAnswer.config.payloadKey).toBe('lastGrazed')
  })

  it('should define the right empty input message', () => {
    expect(LastGrazedAnswer.config.validation.empty?.message).toBe(
      'Enter when the field was last grazed by the resident herd'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(LastGrazedAnswer.config.validation.maxLength?.value).toBe(maxLength)
    expect(LastGrazedAnswer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})
