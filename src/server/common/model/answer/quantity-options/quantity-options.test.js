import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { QuantityOptionsAnswer } from './quantity-options.js'
/** @import {QuantityOptionsPayload} from './quantity-options.js' */

/** @type {QuantityOptionsPayload} */
const payload = {
  quantityOptions: 'no'
}

describe('QuantityOptions', () => {
  it('should be a radio button', () => {
    expect(new QuantityOptionsAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(QuantityOptionsAnswer.config.payloadKey).toBe('quantityOptions')
  })

  it('should define the right empty input message', () => {
    expect(QuantityOptionsAnswer.config.errors.emptyOptionText).toBe(
      'Select if you will move more than 75 animals'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(QuantityOptionsAnswer.config.options)).toHaveLength(3)
    expect(QuantityOptionsAnswer.config.options.yes.label).toBe('Yes')
    expect(QuantityOptionsAnswer.config.options.no.label).toBe('No')
    expect(QuantityOptionsAnswer.config.options.unknown.label).toBe(
      "I don't know"
    )
  })
})
