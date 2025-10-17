import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { GrazingFieldHowSeparatedAnswer } from './grazing-field-how-separated.js'
/** @import {GrazingFieldHowSeparatedPayload} from './grazing-field-how-separated.js' */

/** @type {GrazingFieldHowSeparatedPayload} */
const payload = {
  grazingFieldHowSeparated: ['roadsCreateBoundary']
}

describe('GrazingFieldHowSeparated', () => {
  it('should be a checkbox answer', () => {
    expect(new GrazingFieldHowSeparatedAnswer(payload)).toBeInstanceOf(
      CheckboxAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(GrazingFieldHowSeparatedAnswer.config.payloadKey).toBe(
      'grazingFieldHowSeparated'
    )
  })

  it('should define the expected options', () => {
    const { options } = GrazingFieldHowSeparatedAnswer.config
    expect(Object.keys(options)).toEqual([
      'roadsCreateBoundary',
      'minimumThreeMetres',
      'other'
    ])
    expect(options.minimumThreeMetres.hint).toBe(
      'Such as by hedges, doubling fencing or walls'
    )
  })

  it('should define the right empty input message', () => {
    expect(
      GrazingFieldHowSeparatedAnswer.config.validation.empty?.message
    ).toBe(
      'Select which measures are being taken to reduce the spread of TB when the animals are grazing'
    )
  })
})
