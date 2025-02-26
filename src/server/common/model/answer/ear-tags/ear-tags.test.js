import { TextAreaAnswer } from '../text-area/text-area.js'
import { EarTagsAnswer } from './ear-tags.js'
/** @import {EarTagsPayload} from './ear-tags.js' */

const maxLength = 5000

/** @type {EarTagsPayload} */
const payload = {
  earTags: `
    UK 230011 200123,
    UK 230011 200125
  `
}

describe('Disinfectant', () => {
  it('should be a text area input', () => {
    expect(new EarTagsAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(EarTagsAnswer.config.payloadKey).toBe('earTags')
  })

  it('should define the right empty input message', () => {
    expect(EarTagsAnswer.config.validation.empty?.message).toBe(
      'Enter the ear tag numbers of the animals you are planning to move'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(EarTagsAnswer.config.validation.maxLength.value).toBe(maxLength)
    expect(EarTagsAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should be the right height', () => {
    expect(EarTagsAnswer.config.rows).toBe(10)
  })
})
