import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { DestinationTypeAnswer } from './destination-type.js'
/** @import {DestinationTypePayload} from './destination-type.js' */

/** @type {DestinationTypePayload} */
const payload = {
  destinationType: 'slaughter'
}

const tbRestrictedFarmLabel = 'TB restricted farm'
const slaughterLabel = 'Slaughter'
const afuLabel = 'Approved finishing unit (AFU)'
const afuHint = 'Including enhanced with grazing (AFUE)'
const otherLabel = 'Another destination with TB restrictions'

describe('DestinationType', () => {
  it('should be a radio button', () => {
    expect(new DestinationTypeAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(DestinationTypeAnswer.config({}).payloadKey).toBe('destinationType')
  })

  it('should define the right empty input message', () => {
    expect(DestinationTypeAnswer.config({}).validation.empty).toBe(
      'Select where the animals are going'
    )
  })
})

describe('DestinationType.config.options', () => {
  afterEach(jest.resetAllMocks)

  it('should have the expected options to select from for off the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'off', originType: 'iso-unit' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(2)
    expect(config.options.slaughter.label).toBe(slaughterLabel)
    expect(config.options.afu.label).toBe(afuLabel)
  })

  it('should have the expected options to select from for off the farm movements when moving from AFU', () => {
    const context = {
      origin: { onOffFarm: 'off', originType: 'afu' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(3)
    expect(config.options.slaughter.label).toBe(slaughterLabel)
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.other.label).toBe(otherLabel)
  })

  it('should have the expected options to select from for off the farm movements when moving from iso unit', () => {
    const context = {
      origin: { onOffFarm: 'off', originType: 'iso-unit' }
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
    expect(Object.keys(config.options)).toHaveLength(3)

    expect(config.options['tb-restricted-farm'].label).toBe(
      tbRestrictedFarmLabel
    )
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.afu.hint).toBe(afuHint)
    expect(config.options.other.label).toBe(otherLabel)
  })

  it('should have the expected options to select from for on the farm movements when moving from AFU', () => {
    const context = {
      origin: { onOffFarm: 'on', originType: 'afu' }
    }
    const config = new DestinationTypeAnswer(undefined, context).config
    expect(Object.keys(config.options)).toHaveLength(2)
    expect(config.options.afu.label).toBe(afuLabel)
    expect(config.options.afu.hint).toBe(afuHint)
    expect(config.options.other.label).toBe(otherLabel)
  })
})

describe('DestinationType.isTbRestricted', () => {
  it('should return true for "tb-restricted-farm"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('tb-restricted-farm')).toBe(
      true
    )
  })

  it('should return false for "afu"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('afu')).toBe(false)
  })

  it('should return false for "unrestricted-farm"', () => {
    expect(DestinationTypeAnswer.isTbRestricted('unrestricted-farm')).toBe(
      false
    )
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
