import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { KeptSeparatelyAnswer } from './kept-separately.js'
/** @import {KeptSeparatelyPayload} from './kept-separately.js' */

/** @type {KeptSeparatelyPayload} */
const payload = {
  keptSeparately: 'yes'
}

describe('KeptSeparately', () => {
  it('should be a radio button', () => {
    expect(new KeptSeparatelyAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(KeptSeparatelyAnswer.config.payloadKey).toBe('keptSeparately')
  })

  it('should define the right empty input message', () => {
    expect(KeptSeparatelyAnswer.config.errors.emptyOptionText).toBe(
      'Select if the incoming cattle will be kept separately'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(KeptSeparatelyAnswer.config.options)).toHaveLength(2)
    expect(KeptSeparatelyAnswer.config.options.yes.label).toBe('Yes')
    expect(KeptSeparatelyAnswer.config.options.no.label).toBe('No')
  })
})
