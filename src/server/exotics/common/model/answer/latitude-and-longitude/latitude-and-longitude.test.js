import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { LatitudeAndLongitudeAnswer } from './latitude-and-longitude.js'
/** @import {LatitudeAndLongitudePayload} from './latitude-and-longitude.js' */

const maxLength = 100

/** @type {LatitudeAndLongitudePayload} */
const payload = {
  latitudeAndLongitude: 'some number'
}

describe('LatitudeAndLongitudeAnswer', () => {
  it('should be a text input', () => {
    expect(new LatitudeAndLongitudeAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(LatitudeAndLongitudeAnswer.config.payloadKey).toBe(
      'latitudeAndLongitude'
    )
  })

  it('should have isPageHeading set to false', () => {
    expect(LatitudeAndLongitudeAnswer.config.isPageHeading).toBe(false)
  })

  it('should have spellCheck set to false', () => {
    expect(LatitudeAndLongitudeAnswer.config.spellcheck).toBe(false)
  })

  it('should have characterWidth set to 20', () => {
    expect(LatitudeAndLongitudeAnswer.config.characterWidth).toBe(20)
  })

  it('should define the right empty input message', () => {
    expect(LatitudeAndLongitudeAnswer.config.validation.empty?.message).toBe(
      'Enter the latitude and longitude measurements'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(LatitudeAndLongitudeAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(
      LatitudeAndLongitudeAnswer.config.validation.maxLength?.message
    ).toBe(`Your answer must be no longer than ${maxLength} characters`)
  })
})
