import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { RestockAnimalsAnswer } from './restock-animals.js'
/** @import {RestockReasonPayload} from './restock-animals.js' */

/** @type {RestockReasonPayload} */
const payload = {
  restockAnimals: [
    'fattening',
    'breeding',
    'sucklingRestocking',
    'dairyRestocking',
    'other'
  ]
}

describe('RestockAnimalsAnswer', () => {
  it('should be a checkbox', () => {
    expect(new RestockAnimalsAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(RestockAnimalsAnswer.config.payloadKey).toBe('restockAnimals')
  })

  it('should have no validation', () => {
    expect(RestockAnimalsAnswer.config.validation).toEqual({
      empty: {
        message: 'Select which types of animals you are restocking'
      }
    })
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(RestockAnimalsAnswer.config.options)).toHaveLength(6)
    expect(RestockAnimalsAnswer.config.options.calves.label).toBe('Calves')
    expect(RestockAnimalsAnswer.config.options.heifers.label).toBe('Heifers')
    expect(RestockAnimalsAnswer.config.options.cows.label).toBe('Cows')
    expect(RestockAnimalsAnswer.config.options.pregnantCows.label).toBe(
      'Pregnant cows'
    )
    expect(RestockAnimalsAnswer.config.options.dairyCows.label).toBe(
      'Dairy cows'
    )
    expect(RestockAnimalsAnswer.config.options.sucklingCalves.label).toBe(
      'Suckling calves'
    )
  })
})
