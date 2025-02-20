import { spyOnConfig } from '../../../test-helpers/config.js'
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

describe('#OriginType.config', () => {
  it('should have the expected options to select from for off the farm movements, when biosecurity feature flag is disabled', () => {
    spyOnConfig('featureFlags', { biosecurity: false })
    const context = {
      origin: { onOffFarm: 'off' }
    }
    const config = new OriginTypeAnswer(undefined, context).config

    expect(Object.keys(config.options)).toHaveLength(3)
    expect(config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.other.label).toBe('Another type of premises')
  })

  it('should have the expected options to select from for off the farm movements, when biosecurity feature flag is *enabled*', () => {
    spyOnConfig('featureFlags', { biosecurity: true })
    const context = {
      origin: { onOffFarm: 'off' }
    }
    const config = new OriginTypeAnswer(undefined, context).config

    expect(Object.keys(config.options)).toHaveLength(6)
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
    expect(config.options.zoo.label).toBe('Zoo')
    expect(config.options.lab.label).toBe('Laboratory')
    expect(config.options.other.label).toBe('Another origin')
  })

  it('should have the expected options to select from for on to the farm movements', () => {
    const context = {
      origin: { onOffFarm: 'on' }
    }
    const config = new OriginTypeAnswer(undefined, context).config

    expect(config.options.market.label).toBe('Market')
    expect(config.options['unrestricted-farm'].label).toBe(
      'Unrestricted farm or premises'
    )
    expect(config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(config.options.afu.label).toBe('Approved finishing unit (AFU)')
    expect(config.options.afu.hint).toBe(
      'Including enhanced with grazing (AFUE)'
    )
    expect(config.options.zoo.label).toBe('Zoo')
    expect(config.options.lab.label).toBe('Laboratory')
    expect(config.options['after-import-location'].label).toBe(
      'Location after animals have been imported'
    )
    expect(config.options.other.label).toBe('Another origin')
    expect(Object.keys(config.options)).toHaveLength(8)
  })
})
