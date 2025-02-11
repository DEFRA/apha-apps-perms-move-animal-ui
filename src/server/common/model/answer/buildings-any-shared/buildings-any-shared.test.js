import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { BuildingsAnySharedAnswer } from './buildings-any-shared.js'
/** @import {BuildingsAnySharedPayload} from './buildings-any-shared.js' */

/** @type {BuildingsAnySharedPayload} */
const payload = {
  buildingsAnyShared: 'yes'
}

describe('BuildingsAnyShared', () => {
  it('should be a radio button', () => {
    expect(new BuildingsAnySharedAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(BuildingsAnySharedAnswer.config.payloadKey).toBe(
      'buildingsAnyShared'
    )
  })

  it('should define the right empty input message', () => {
    expect(BuildingsAnySharedAnswer.config.errors.emptyOptionText).toBe(
      'Select if the cattle will share any buildings with the resident herd'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(BuildingsAnySharedAnswer.config.options)).toHaveLength(2)
    expect(BuildingsAnySharedAnswer.config.options.yes.label).toBe('Yes')
    expect(BuildingsAnySharedAnswer.config.options.no.label).toBe('No')
  })
})
