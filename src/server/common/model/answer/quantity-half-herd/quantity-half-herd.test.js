import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { QuantityHalfHerdAnswer } from './quantity-half-herd.js'
/** @import {QuantityHalfHerdPayload} from './quantity-half-herd.js' */

/** @type {QuantityHalfHerdPayload} */
const payload = {
  quantityHalfHerd: 'no'
}

describe('QuantityHalfHerd', () => {
  it('should be a radio button', () => {
    expect(new QuantityHalfHerdAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(QuantityHalfHerdAnswer.config.payloadKey).toBe('quantityHalfHerd')
  })

  it('should define the right empty input message', () => {
    expect(QuantityHalfHerdAnswer.config.errors.emptyOptionText).toBe(
      'Select if the number of cattle will be larger than half of the destination herd size'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(QuantityHalfHerdAnswer.config.options)).toHaveLength(3)
    expect(QuantityHalfHerdAnswer.config.options.yes.label).toBe('Yes')
    expect(QuantityHalfHerdAnswer.config.options.no.label).toBe('No')
    expect(QuantityHalfHerdAnswer.config.options.unknown.label).toBe(
      "I don't know"
    )
  })
})
