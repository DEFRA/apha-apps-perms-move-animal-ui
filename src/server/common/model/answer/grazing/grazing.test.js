import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { GrazingAnswer } from './grazing.js'
/** @import {GrazingPayload} from './grazing.js' */

/** @type {GrazingPayload} */
const payload = {
  grazing: 'yes'
}

describe('Grazing', () => {
  it('should be a radio button', () => {
    expect(new GrazingAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(GrazingAnswer.config.payloadKey).toBe('grazing')
  })

  it('should define the right empty input message', () => {
    expect(GrazingAnswer.config.errors.emptyOptionText).toBe(
      'Select yes if the incoming cattle will be grazed'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(GrazingAnswer.config.options)).toHaveLength(2)
    expect(GrazingAnswer.config.options.yes.label).toBe('Yes')
    expect(GrazingAnswer.config.options.no.label).toBe('No')
  })
})
