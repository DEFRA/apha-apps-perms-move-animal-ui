import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { OnOffFarmAnswer } from './on-off-farm.js'
/** @import {OnOffFarmPayload} from './on-off-farm.js' */

/** @type {OnOffFarmPayload} */
const payload = {
  onOffFarm: 'on'
}

describe('OnOffFarm', () => {
  it('should be a radio button', () => {
    expect(new OnOffFarmAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(OnOffFarmAnswer.config.payloadKey).toBe('onOffFarm')
  })

  it('should define the right empty input message', () => {
    expect(OnOffFarmAnswer.config.validation.empty).toBe(
      'Select if you are moving animals on or off your farm or premises'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(OnOffFarmAnswer.config.options)).toHaveLength(2)
    expect(OnOffFarmAnswer.config.options.on.label).toBe(
      'On to the farm or premises'
    )
    expect(OnOffFarmAnswer.config.options.off.label).toBe(
      'Off the farm or premises'
    )
  })
})
