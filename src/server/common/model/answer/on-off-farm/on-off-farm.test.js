import { OnOffFarmAnswer } from './on-off-farm.js'
/** @import {OnOffFarmPayload} from './on-off-farm.js' */

/** @type {OnOffFarmPayload} */
const validOnOffRadio = {
  onOffFarm: 'on'
}

describe('OnOffFarm', () => {
  describe('OnOffFarm.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validOnOffRadio, nextPage: '/other/page' }
      const onOffFarm = new OnOffFarmAnswer(payload)

      expect(onOffFarm._data).toEqual(validOnOffRadio)
    })
  })

  describe('#OnOffFarm.validate', () => {
    test('should return true for on', () => {
      const { isValid, errors } = new OnOffFarmAnswer({
        onOffFarm: 'on'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return true for off', () => {
      const { isValid, errors } = new OnOffFarmAnswer({
        onOffFarm: 'off'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    test('should return false for empty', () => {
      const { isValid, errors } = new OnOffFarmAnswer(undefined).validate()

      expect(isValid).toBe(false)
      expect(errors.onOffFarm.text).toBe(
        'Select if you are moving cattle on or off your farm or premises'
      )
    })
  })

  describe('#OnOffFarm.toState', () => {
    test('should replace missing data with blank string', () => {
      const data = new OnOffFarmAnswer().toState()

      expect(data).toBeUndefined()
    })

    test('should pass through valid data unaltered', () => {
      const data = new OnOffFarmAnswer({ onOffFarm: 'on' }).toState()

      expect(data).toBe('on')
    })
  })

  describe('OnOffFarm.fromState', () => {
    it('should return just the onOffFarm value from the payload', () => {
      const state = new OnOffFarmAnswer(validOnOffRadio).toState()
      expect(OnOffFarmAnswer.fromState(state)._data).toEqual(validOnOffRadio)
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(OnOffFarmAnswer.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(OnOffFarmAnswer.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#OnOffFarm.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(new OnOffFarmAnswer({ onOffFarm: 'on' }).value).toBe('on')
    })
  })

  describe('#OnOffFarm.html', () => {
    it('should return the full text for `on`', () => {
      expect(new OnOffFarmAnswer({ onOffFarm: 'on' }).html).toBe(
        'On to the farm or premises'
      )
    })

    it('should return the full text for `off`', () => {
      expect(new OnOffFarmAnswer({ onOffFarm: 'off' }).html).toBe(
        'Off the farm or premises'
      )
    })

    it('should return an empty string for undefined', () => {
      expect(new OnOffFarmAnswer(undefined).html).toBe('')
    })
  })
})
