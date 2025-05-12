import { HiddenAnswer } from '../hidden/hidden.js'
import { BiosecurityObligationsAnswer } from './biosecurity-obligations.js'
/** @import {BiosecurityObligationsPayload} from './biosecurity-obligations.js' */

/** @type {BiosecurityObligationsPayload} */
const payload = {
  biosecurityObligationsAcknowledged: 'yes'
}

describe('BiosecurityObligations', () => {
  it('should be a hidden input', () => {
    expect(new BiosecurityObligationsAnswer(payload)).toBeInstanceOf(
      HiddenAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(BiosecurityObligationsAnswer.config.payloadKey).toBe(
      'biosecurityObligationsAcknowledged'
    )
  })

  it('should have the expected value', () => {
    expect(BiosecurityObligationsAnswer.config.value).toBe('yes')
  })
})
