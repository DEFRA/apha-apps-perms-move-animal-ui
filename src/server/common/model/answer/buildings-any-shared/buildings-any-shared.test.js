import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { BuildingsAnySharedAnswer } from './buildings-any-shared.js'
/** @import {BuildingsAnySharedPayload} from './buildings-any-shared.js' */

/** @type {BuildingsAnySharedPayload} */
const payload = {
  animalsHoused: 'yes'
}

describe('BuildingsAnyShared', () => {
  it('should be a radio button', () => {
    expect(new BuildingsAnySharedAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(BuildingsAnySharedAnswer.config.payloadKey).toBe('animalsHoused')
  })

  it('should define the right empty input message', () => {
    expect(BuildingsAnySharedAnswer.config.validation.empty).toBe(
      'Select if the animals will be housed'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(BuildingsAnySharedAnswer.config.options)).toHaveLength(2)
    expect(BuildingsAnySharedAnswer.config.options.yes.label).toBe('Yes')
    expect(BuildingsAnySharedAnswer.config.options.no.label).toBe('No')
  })

  it('should have the expected hint', () => {
    expect(BuildingsAnySharedAnswer.config.hint).toBe(
      'This includes shared spaces such as pens'
    )
  })
})
