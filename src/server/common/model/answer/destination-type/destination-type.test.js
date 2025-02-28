import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { DestinationTypeAnswer } from './destination-type.js'
/** @import {DestinationTypePayload} from './destination-type.js' */

/** @type {DestinationTypePayload} */
const payload = {
  destinationType: 'slaughter'
}

const tbRestrictedFarmLabel = 'TB restricted farm'
const slaughterLabel = 'Slaughter'
const dedicatedSaleLabel = 'Dedicated sale for TB (orange market)'
const afuLabel = 'Approved finishing unit (AFU)'
const afuHint = 'Including enhanced with grazing (AFUE)'
const zooLabel = 'Zoo with TB restrictions'
const labLabel = 'Laboratory'
const otherLabel = 'Another destination'

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
    expect(Object.keys(config.options)).toHaveLength(7)
    expect(config.options['tb-restricted-farm'].label).toBe(
      tbRestrictedFarmLabel
    )
    expect(config.options.slaughter.label).toBe(slaughterLabel)
    expect(config.options['dedicated-sale'].label).toBe(dedicatedSaleLabel)
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.zoo.label).toBe(zooLabel)
    expect(config.options.lab.label).toBe(labLabel)
    expect(config.options.other.label).toBe(otherLabel)
  })

  it('should have the expected options to select from for off the farm movements when moving from AFU', () => {
    const context = {
      origin: { onOffFarm: 'off', originType: 'afu' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(2)
    expect(config.options.slaughter.label).toBe(slaughterLabel)
    expect(config.options.afu.label).toBe(afuLabel)
  })

  it('should have the expected options to select from for on the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'on' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(5)

    expect(config.options['tb-restricted-farm'].label).toBe(
      tbRestrictedFarmLabel
    )
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.afu.hint).toBe(afuHint)
    expect(config.options.zoo.label).toBe(zooLabel)
    expect(config.options.lab.label).toBe(labLabel)
    expect(config.options.other.label).toBe(otherLabel)
  })

  it('should have the expected options to select from for on the farm movements when moving from AFU', () => {
    const context = {
      origin: { onOffFarm: 'on', originType: 'afu' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(1)
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.afu.hint).toBe(afuHint)
  })
})
