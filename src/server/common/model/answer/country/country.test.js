import { TextAnswer } from '../text/text.js'
import { CountryAnswer } from './country.js'
/** @import {CountryPayload} from './country.js' */

const maxLength = 255

/** @type {CountryPayload} */
const payload = {
  country: 'France'
}

describe('CountryAnswer', () => {
  it('should be a text input', () => {
    expect(new CountryAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(CountryAnswer.config.payloadKey).toBe('country')
  })

  it('should define the right empty input message', () => {
    expect(CountryAnswer.config.validation.empty.message).toBe(
      'Enter which country the animals are coming from'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(CountryAnswer.config.validation.maxLength.value).toBe(maxLength)
    expect(CountryAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 255 characters'
    )
  })
})
