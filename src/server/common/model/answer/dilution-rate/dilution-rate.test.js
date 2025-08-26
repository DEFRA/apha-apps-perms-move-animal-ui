import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { DilutionRateAnswer } from './dilution-rate.js'
/** @import {DilutionRatePayload} from './dilution-rate.js' */

/** @type {DilutionRatePayload} */
const payload = {
  dilutionRate: ['dilutionRateConfirmed']
}

describe('DilutionRate', () => {
  it('should be a checkbox', () => {
    expect(new DilutionRateAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(DilutionRateAnswer.config.payloadKey).toBe('dilutionRate')
  })

  it('should define the right empty input message', () => {
    expect(DilutionRateAnswer.config.validation.empty?.message).toBe(
      'You need to tick the confirmation box'
    )
  })

  it('should have the right isPageHeading value', () => {
    expect(DilutionRateAnswer.config.isPageHeading).toBe(false)
  })
})
