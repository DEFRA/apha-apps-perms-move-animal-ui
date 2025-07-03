import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { CalvesUnder42DaysOldAnswer } from './calves-under-42-days-old.js'
/** @import {CalvesUnder42DaysOldPayload} from './calves-under-42-days-old.js' */

/** @type {CalvesUnder42DaysOldPayload} */
const payload = {
  calvesUnder42DaysOld: 'yes'
}

describe('CalvesUnder42DaysOld', () => {
  it('should be a radio button', () => {
    expect(new CalvesUnder42DaysOldAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(CalvesUnder42DaysOldAnswer.config.payloadKey).toBe(
      'calvesUnder42DaysOld'
    )
  })

  it('should define the right empty input message', () => {
    expect(CalvesUnder42DaysOldAnswer.config.validation.empty).toBe(
      'Select if you will move any calves under 42 days old'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(CalvesUnder42DaysOldAnswer.config.options)).toHaveLength(
      2
    )
    expect(CalvesUnder42DaysOldAnswer.config.options.yes.label).toBe('Yes')
    expect(CalvesUnder42DaysOldAnswer.config.options.no.label).toBe('No')
  })

  it('should have the expected hint', () => {
    expect(CalvesUnder42DaysOldAnswer.config.hint).toBe(
      'We need to know if the calves are under 42 days old on the date you are planning to move them'
    )
  })
})
