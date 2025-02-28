import { TextAreaAnswer } from '../text-area/text-area.js'
import { BadgersAnswer } from './badgers.js'
/** @import {BadgersPayload} from './badgers.js' */

const maxLength = 5000

/** @type {BadgersPayload} */
const payload = {
  badgers: 'some text'
}

describe('Badgers', () => {
  it('should be a text area', () => {
    expect(new BadgersAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(BadgersAnswer.config.payloadKey).toBe('badgers')
  })

  it('should be the expected height', () => {
    expect(BadgersAnswer.config.rows).toBe(8)
  })

  it('should define the right empty input message', () => {
    expect(BadgersAnswer.config.validation.empty?.message).toBe(
      'Enter information on what measures you are taking to reduce the risk of infection from badgers and wildlife'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(BadgersAnswer.config.validation.maxLength.value).toBe(maxLength)
    expect(BadgersAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})
