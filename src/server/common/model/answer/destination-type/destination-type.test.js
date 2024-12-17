import { DestinationTypeAnswer } from './destination-type.js'
/** @import {DestinationTypePayload} from './destination-type.js' */

/** @type {DestinationTypePayload} */
const validDestinationTypeRadio = {
  destinationType: 'slaughter'
}

describe('DestinationType', () => {
  describe('#DestinationType.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validDestinationTypeRadio, nextPage: '/other/page' }
      const destinationType = new DestinationTypeAnswer(payload)

      expect(destinationType._data).toEqual(validDestinationTypeRadio)
    })
  })

  describe('#DestinationType.validate', () => {
    it('should return true for slaughter', () => {
      const { isValid, errors } = new DestinationTypeAnswer({
        destinationType: 'slaughter'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return true for dedicated-sale', () => {
      const { isValid, errors } = new DestinationTypeAnswer({
        destinationType: 'dedicated-sale'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return true for afu', () => {
      const { isValid, errors } = new DestinationTypeAnswer({
        destinationType: 'afu'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return true for other', () => {
      const { isValid, errors } = new DestinationTypeAnswer({
        destinationType: 'other'
      }).validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return false for empty', () => {
      const { isValid, errors } = new DestinationTypeAnswer(
        undefined
      ).validate()

      expect(isValid).toBe(false)
      expect(errors.destinationType.text).toBe(
        'Select where the animals are going'
      )
    })
  })

  describe('#DestinationType.toState', () => {
    it('should replace missing data with blank string', () => {
      const data = new DestinationTypeAnswer().toState()

      expect(data).toBeUndefined()
    })

    it('should pass through valid data unaltered', () => {
      const data = new DestinationTypeAnswer(
        validDestinationTypeRadio
      ).toState()

      expect(data).toBe(validDestinationTypeRadio.destinationType)
    })
  })

  describe('DestinationType.fromState', () => {
    it('should return just the destinationType value from the payload', () => {
      const state = new DestinationTypeAnswer(
        validDestinationTypeRadio
      ).toState()
      expect(DestinationTypeAnswer.fromState(state)._data).toEqual(
        validDestinationTypeRadio
      )
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(DestinationTypeAnswer.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(DestinationTypeAnswer.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#DestinationType.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      expect(
        new DestinationTypeAnswer({
          destinationType: 'slaughter'
        }).value
      ).toBe('slaughter')
    })
  })

  describe('#DestinationType.html', () => {
    it('should return the full text for `slaughter`', () => {
      expect(
        new DestinationTypeAnswer({
          destinationType: 'slaughter'
        }).html
      ).toBe('Slaughter')
    })

    it('should return the full text for `dedicated-sale`', () => {
      expect(
        new DestinationTypeAnswer({
          destinationType: 'dedicated-sale'
        }).html
      ).toBe('Dedicated sale for TB (orange market)')
    })

    it('should return the full text for `afu`', () => {
      expect(
        new DestinationTypeAnswer({
          destinationType: 'afu'
        }).html
      ).toBe('Approved finishing unit (AFU)')
    })

    it('should return the full text for `other`', () => {
      expect(
        new DestinationTypeAnswer({
          destinationType: 'other'
        }).html
      ).toBe('Another destination')
    })

    it('should return an empty string for undefined', () => {
      expect(new DestinationTypeAnswer(undefined).html).toBe('')
    })
  })
})
