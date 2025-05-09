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
const labLabel = 'Laboratory with TB restrictions'
const otherLabel = 'Another destination with TB restrictions'

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
  afterEach(jest.resetAllMocks)

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

describe('DestinationType.isTbRestricted', () => {
  it('should return true for "tb-restricted-farm"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('tb-restricted-farm')).toBe(
      true
    )
  })

  it('should return true for "zoo"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('zoo')).toBe(true)
  })

  it('should return false for "afu"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('afu')).toBe(false)
  })

  it('should return false for "unrestricted-farm"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('unrestricted-farm')).toBe(
      false
    )
  })

  it('should return true for "lab"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('lab')).toBe(true)
  })

  it('should return true for "other"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('other')).toBe(true)
  })

  it('should return false for undefined', () => {
    expect(DestinationTypeAnswer.isTbRestricted(undefined)).toBe(false)
  })

  it('should return false for null', () => {
    expect(DestinationTypeAnswer.isTbRestricted(null)).toBe(false)
  })

  it('should return false for an empty string', () => {
    expect(DestinationTypeAnswer.isTbRestricted('')).toBe(false)
  })
})
