import { OriginTypeAnswer } from './origin-type.js'
/** @import {OriginTypePayload, OriginTypeData} from './origin-type.js' */

/** @type {OriginTypePayload} */
const validOriginTypeRadio = {
  originType: 'tb-restricted-farm'
}

/** @type {OriginTypeData[]} */
const validOriginTypes = ['tb-restricted-farm', 'afu', 'other']

describe('OriginType', () => {
  describe('#OriginType.new', () => {
    it('should strip away any irrelevant values', () => {
      const payload = { ...validOriginTypeRadio, nextPage: '/other/page' }
      const originType = new OriginTypeAnswer(payload)

      expect(originType._data).toEqual(validOriginTypeRadio)
    })
  })

  describe('#OriginType.validate', () => {
    it('should return true for all valid options', () => {
      validOriginTypes.forEach((originType) => {
        const { isValid, errors } = new OriginTypeAnswer({
          originType
        }).validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    it('should return false for empty', () => {
      const { isValid, errors } = new OriginTypeAnswer(undefined).validate()

      expect(isValid).toBe(false)
      expect(errors.originType.text).toBe(
        'Select where the animals are moving from'
      )
    })
  })

  describe('OriginType.toState', () => {
    it('should replace missing data with blank string', () => {
      const data = new OriginTypeAnswer().toState()

      expect(data).toBeUndefined()
    })

    it('should pass through valid data unaltered', () => {
      const data = new OriginTypeAnswer(validOriginTypeRadio).toState()

      expect(data).toBe(validOriginTypeRadio.originType)
    })
  })

  describe('originType.fromState', () => {
    it('should return just the originType value from the payload', () => {
      const state = new OriginTypeAnswer(validOriginTypeRadio).toState()
      expect(OriginTypeAnswer.fromState(state)._data).toEqual(
        validOriginTypeRadio
      )
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(OriginTypeAnswer.fromState(undefined).value).toBeUndefined()
    })

    it('should store undefined if the state is undefined', () => {
      expect(OriginTypeAnswer.fromState(undefined)._data).toBeUndefined()
    })
  })

  describe('#OriginType.value', () => {
    it('should return a value-wrapped object to rendering in the template', () => {
      validOriginTypes.forEach((originType) => {
        expect(new OriginTypeAnswer({ originType }).value).toBe(originType)
      })
    })
  })

  describe('#originType.html', () => {
    it('should return the full text for `dedicated-sale`', () => {
      expect(
        new OriginTypeAnswer({
          originType: 'tb-restricted-farm'
        }).html
      ).toBe('TB restricted farm')
    })

    it('should return the full text for `afu`', () => {
      expect(
        new OriginTypeAnswer({
          originType: 'afu'
        }).html
      ).toBe('Approved finishing unit (AFU)')
    })

    it('should return the full text for `other`', () => {
      expect(
        new OriginTypeAnswer({
          originType: 'other'
        }).html
      ).toBe('Another type of premises')
    })

    it('should return an empty string for undefined', () => {
      expect(new OriginTypeAnswer(undefined).html).toBe('')
    })
  })
})
