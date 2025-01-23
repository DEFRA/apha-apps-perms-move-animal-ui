import { RadioButtonAnswer } from './radio-button.js'

/** @import {RadioButtonConfig} from './radio-button.js' */

/**
 * export @typedef {'on' | 'off'} OnOffFarmData
 * @typedef {{ onOffFarm: 'on' | 'off' }} OnOffFarmPayload
 */

/** @type {OnOffFarmPayload} */
const validOnOffRadio = {
  onOffFarm: 'on'
}

/** @type {RadioButtonConfig} */
const onOffFarmConfig = {
  payloadKey: 'onOffFarm',
  options: {
    on: { label: 'On to the farm or premises' },
    off: { label: 'Off the farm or premises' }
  },
  errors: {
    emptyOptionText:
      'Select if you are moving cattle on or off your farm or premises'
  }
}

class OnOffFarmTest extends RadioButtonAnswer {
  get config() {
    return onOffFarmConfig
  }

  static get config() {
    return onOffFarmConfig
  }
}

describe('RadioButton', () => {
  describe('RadioButton.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validOnOffRadio, nextPage: '/other/page' }
      const onOffFarm = new OnOffFarmTest(payload)

      expect(onOffFarm._data).toEqual(validOnOffRadio)
    })
  })

  describe('#RadioButton.validate', () => {
    test('should return true for on', () => {
      const { isValid, errors } = new OnOffFarmTest({
        onOffFarm: 'on'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return true for off', () => {
      const { isValid, errors } = new OnOffFarmTest({
        onOffFarm: 'off'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return false for empty', () => {
      const { isValid, errors } = new OnOffFarmTest(undefined).validate()

      expect(isValid).toBe(false)
      expect(errors.onOffFarm.text).toBe(
        'Select if you are moving cattle on or off your farm or premises'
      )
    })

    it('should return false for an invalid', () => {
      const onOffFarm = new OnOffFarmTest({
        onOffFarm: 'invalid value'
      })

      const { isValid, errors } = onOffFarm.validate()

      expect(isValid).toBe(false)
      expect(errors.onOffFarm.text).toBe(
        'Select if you are moving cattle on or off your farm or premises'
      )
    })
  })

  describe('#RadioButton.toState', () => {
    test('should replace missing data with blank string', () => {
      const data = new OnOffFarmTest().toState()
      expect(data).toBe('')
    })

    test('should pass through valid data unaltered', () => {
      const data = new OnOffFarmTest({ onOffFarm: 'on' }).toState()

      expect(data).toBe('on')
    })
  })

  describe('RadioButton.fromState', () => {
    it('should return just the onOffFarm value from the payload', () => {
      const state = new OnOffFarmTest(validOnOffRadio).toState()
      expect(OnOffFarmTest.fromState(state)._data).toEqual(validOnOffRadio)
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(OnOffFarmTest.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(OnOffFarmTest.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#RadioButton.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(new OnOffFarmTest({ onOffFarm: 'on' }).value).toBe('on')
    })
  })

  describe('#RadioButton.html', () => {
    it('should return the full text for `on`', () => {
      expect(new OnOffFarmTest({ onOffFarm: 'on' }).html).toBe(
        'On to the farm or premises'
      )
    })

    it('should return the full text for `off`', () => {
      expect(new OnOffFarmTest({ onOffFarm: 'off' }).html).toBe(
        'Off the farm or premises'
      )
    })

    it('should return an empty string for undefined', () => {
      expect(new OnOffFarmTest(undefined).html).toBe('')
    })
  })
})
