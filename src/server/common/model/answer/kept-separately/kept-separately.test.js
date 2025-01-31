import { KeptSeparatelyAnswer } from './kept-separately.js'
/** @import {KeptSeparatelyPayload} from './kept-separately.js' */

/** @type {KeptSeparatelyPayload} */
const payload = {
  keptSeparately: 'yes'
}

describe('KeptSeparately', () => {
  it('should have same static config & instance config', () => {
    expect(new KeptSeparatelyAnswer(payload).config).toEqual(
      KeptSeparatelyAnswer.config
    )
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
