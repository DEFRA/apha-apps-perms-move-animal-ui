import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { RestockReasonsAnswer } from './restock-reasons.js'
/** @import {RestockReasonPayload} from './restock-reasons.js' */

/** @type {RestockReasonPayload} */
const payload = {
  restockReasons: [
    'fattening',
    'breeding',
    'sucklingRestocking',
    'dairyRestocking',
    'other'
  ]
}

describe('BadgersAnswer', () => {
  it('should be a checkbox', () => {
    expect(new RestockReasonsAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(RestockReasonsAnswer.config.payloadKey).toBe('restockReasons')
  })

  it('should have no validation', () => {
    expect(RestockReasonsAnswer.config.validation).toEqual({
      empty: {
        message: 'Select the reasons you have for restocking'
      }
    })
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(RestockReasonsAnswer.config.options)).toHaveLength(5)
    expect(RestockReasonsAnswer.config.options.fattening.label).toBe(
      'Fattening'
    )
    expect(RestockReasonsAnswer.config.options.breeding.label).toBe('Breeding')
    expect(RestockReasonsAnswer.config.options.sucklingRestocking.label).toBe(
      'Suckling restocking'
    )
    expect(RestockReasonsAnswer.config.options.dairyRestocking.label).toBe(
      'Dairy restocking'
    )
    expect(RestockReasonsAnswer.config.options.other.label).toBe(
      'Something else'
    )
  })
})
