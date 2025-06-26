import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { OriginTypeAnswer } from './origin-type.js'
/** @import {OriginTypePayload} from './origin-type.js' */

/** @type {OriginTypePayload} */
const payload = {
  originType: 'afu'
}

describe('OriginType', () => {
  it('should be a radio button', () => {
    expect(new OriginTypeAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(new OriginTypeAnswer().config.payloadKey).toBe('originType')
  })

  it('should define the right empty input message', () => {
    expect(new OriginTypeAnswer().config.errors.emptyOptionText).toBe(
      'Select where the animals are moving from'
    )
  })
})

describe('OriginType.config', () => {
  it('should have the expected options to select from for off the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'off' }
    }
    const config = new OriginTypeAnswer(undefined, context).config

    expect(Object.keys(config.options)).toHaveLength(5)
    expect(config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.afu.hint).toBe(
      'Including enhanced with grazing (AFUE)'
    )
    expect(config.options['unrestricted-farm'].label).toBe(
      'Unrestricted farm or premises'
    )
    expect(config.options['iso-unit'].label).toBe('TB isolation unit')
    expect(config.options.other.label).toBe('Another TB restrictied origin')
  })

  it('should have the expected options to select from for on to the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'on' }
    }
    const config = new OriginTypeAnswer(undefined, context).config

    expect(config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.afu.hint).toBe(
      'Including enhanced with grazing (AFUE)'
    )
    expect(config.options['after-import-location'].label).toBe(
      'Location after animals have been imported'
    )
    expect(config.options.other.label).toBe('Another TB restrictied origin')
    expect(Object.keys(config.options)).toHaveLength(5)
  })
})

describe('OriginType.isTbRestricted', () => {
  it('should return true for "tb-restricted-farm"', () => {
    expect(OriginTypeAnswer.isTbRestricted('tb-restricted-farm')).toBe(true)
  })

  it('should return true for "zoo"', () => {
    expect(OriginTypeAnswer.isTbRestricted('zoo')).toBe(true)
  })

  it('should return false for "afu"', () => {
    expect(OriginTypeAnswer.isTbRestricted('afu')).toBe(false)
  })

  it('should return false for "unrestricted-farm"', () => {
    expect(OriginTypeAnswer.isTbRestricted('unrestricted-farm')).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(OriginTypeAnswer.isTbRestricted(undefined)).toBe(false)
  })

  it('should return false for null', () => {
    expect(OriginTypeAnswer.isTbRestricted(null)).toBe(false)
  })

  it('should return false for an empty string', () => {
    expect(OriginTypeAnswer.isTbRestricted('')).toBe(false)
  })
})
