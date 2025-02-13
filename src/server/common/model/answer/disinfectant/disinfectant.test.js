import { TextAnswer } from '../text/text.js'
import { DisinfectantAnswer } from './disinfectant.js'
/** @import {DisinfectantPayload} from './disinfectant.js' */

const maxLength = 5000

/** @type {DisinfectantPayload} */
const payload = {
  disinfectant: 'some disinfectant'
}

describe('Disinfectant', () => {
  it('should be a text input', () => {
    expect(new DisinfectantAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(DisinfectantAnswer.config.payloadKey).toBe('disinfectant')
  })

  it('should define the right empty input message', () => {
    expect(DisinfectantAnswer.config.validation.empty.message).toBe(
      'Enter what disinfectant you are using'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(DisinfectantAnswer.config.validation.maxLength.value).toBe(maxLength)
    expect(DisinfectantAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should have the right isPageHeading value', () => {
    expect(DisinfectantAnswer.config.isPageHeading).toBe(false)
  })
})
