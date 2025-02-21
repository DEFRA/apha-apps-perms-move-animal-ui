import { spyOnConfig } from '../../../test-helpers/config.js'
import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { DestinationTypeAnswer } from './destination-type.js'
/** @import {DestinationTypePayload} from './destination-type.js' */

/** @type {DestinationTypePayload} */
const payload = {
  destinationType: 'slaughter'
}

describe('DestinationType', () => {
  it('should be a radio button', () => {
    expect(new DestinationTypeAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(DestinationTypeAnswer.config({}).payloadKey).toBe('destinationType')
  })

  it('should define the right empty input message', () => {
    expect(DestinationTypeAnswer.config({}).errors.emptyOptionText).toBe(
      'Select where the animals are going'
    )
  })
})

describe('DestinationType.config.options', () => {
  it('should have the expected options to select from for off the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'off' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(4)
    expect(config.options.slaughter.label).toBe('Slaughter')
    expect(config.options['dedicated-sale'].label).toBe(
      'Dedicated sale for TB (orange market)'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.other.label).toBe('Another destination')
  })

  it('should have the expected options to select from for on the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'on' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(5)

    expect(config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.afu.hint).toBe(
      'Including enhanced with grazing (AFUE)'
    )
    expect(config.options.zoo.label).toBe('Zoo')
    expect(config.options.lab.label).toBe('Laboratory')
    expect(config.options.other.label).toBe('Another destination')
    expect(Object.keys(config.options)).toHaveLength(5)
  })
})
