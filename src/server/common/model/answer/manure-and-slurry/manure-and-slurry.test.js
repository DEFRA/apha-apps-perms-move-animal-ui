import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { ManureAndSlurryAnswer } from './manure-and-slurry.js'
/** @import {ManureAndSlurryPayload} from './manure-and-slurry.js' */

/** @type {ManureAndSlurryPayload} */
const payload = {
  manureAndSlurry: 'yes'
}

describe('ManureAndSlurry', () => {
  it('should be a radio button', () => {
    expect(new ManureAndSlurryAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(ManureAndSlurryAnswer.config.payloadKey).toBe('manureAndSlurry')
  })

  it('should define the right empty input message', () => {
    expect(ManureAndSlurryAnswer.config.errors.emptyOptionText).toBe(
      'Select if manure or slurry has been put on the grazing field in the past 60 days'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(ManureAndSlurryAnswer.config.options)).toHaveLength(2)
    expect(ManureAndSlurryAnswer.config.options.yes.label).toBe('Yes')
    expect(ManureAndSlurryAnswer.config.options.no.label).toBe('No')
  })
})
