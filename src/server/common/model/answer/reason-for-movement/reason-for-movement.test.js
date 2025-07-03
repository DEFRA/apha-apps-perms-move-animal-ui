import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { ReasonForMovementAnswer } from './reason-for-movement.js'
/** @import {ReasonForMovementPayload} from './reason-for-movement.js' */

/** @type {ReasonForMovementPayload} */
const payload = {
  reasonForMovement: 'routineRestocking'
}

describe('ReasonForMovement', () => {
  it('should be a radio button', () => {
    expect(new ReasonForMovementAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(ReasonForMovementAnswer.config.payloadKey).toBe('reasonForMovement')
  })

  it('should define the right empty input message', () => {
    expect(ReasonForMovementAnswer.config.validation.empty).toBe(
      'Select the reason for movement'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(ReasonForMovementAnswer.config.options)).toHaveLength(4)
    expect(ReasonForMovementAnswer.config.options.routineRestocking.label).toBe(
      'Routine restocking'
    )
    expect(ReasonForMovementAnswer.config.options.breedingMale.label).toBe(
      'Breeding male'
    )
    expect(ReasonForMovementAnswer.config.options.welfare.label).toBe('Welfare')
    expect(ReasonForMovementAnswer.config.options.other.label).toBe(
      'Something else'
    )
  })
})
