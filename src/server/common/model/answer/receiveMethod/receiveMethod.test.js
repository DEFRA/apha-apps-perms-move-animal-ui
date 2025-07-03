import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { ReceiveMethodAnswer } from './receiveMethod.js'
/** @import {ReceiveMethodPayload} from './receiveMethod.js' */

/** @type {ReceiveMethodPayload} */
const payload = {
  receiveMethod: 'email'
}

describe('ReceiveMethod', () => {
  it('should be a radio button', () => {
    expect(new ReceiveMethodAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(ReceiveMethodAnswer.config.payloadKey).toBe('receiveMethod')
  })

  it('should define the right empty input message', () => {
    expect(ReceiveMethodAnswer.config.validation.empty).toBe(
      'Select how you would like this licence sent to you'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(ReceiveMethodAnswer.config.options)).toHaveLength(2)
    expect(ReceiveMethodAnswer.config.options.email.label).toBe('Email')
    expect(ReceiveMethodAnswer.config.options.post.label).toBe('Post')
  })
})
