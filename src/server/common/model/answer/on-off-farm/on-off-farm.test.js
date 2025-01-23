import { OnOffFarmAnswer } from './on-off-farm.js'
/** @import {OnOffFarmPayload} from './on-off-farm.js' */

/** @type {OnOffFarmPayload} */
const payload = {
  onOffFarm: 'on'
}

describe('OnOffFarm', () => {
  it('should have same static config & instance config', () => {
    expect(new OnOffFarmAnswer(payload).config).toEqual(OnOffFarmAnswer.config)
  })

  it('should have the right payload key', () => {
    expect(OnOffFarmAnswer.config.payloadKey).toBe('onOffFarm')
  })

  it('should define the right empty input message', () => {
    expect(OnOffFarmAnswer.config.errors.emptyOptionText).toBe(
      'Select if you are moving cattle on or off your farm or premises'
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
