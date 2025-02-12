import { ConfirmationAnswer } from './confirmation.js'

describe('#ConfirmationModel', () => {
  describe('Confirmation.new', () => {
    it('should strip away any irrelevant values', () => {
      const validConfirmation = { confirmation: ['confirm', 'other'] }

      const payload = { ...validConfirmation, nextPage: '/other/page' }
      const confirmation = new ConfirmationAnswer(payload)

      expect(confirmation._data).toEqual(validConfirmation)
    })
  })

  describe('validate', () => {
    it('should return valid when only confirmed', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['confirm'] })
      const { isValid } = confirmation.validate()

      expect(isValid).toBe(true)
    })

    it('should return valid when confirmed and on behalf of other', () => {
      const confirmation = new ConfirmationAnswer({
        confirmation: ['confirm', 'other']
      })
      const { isValid } = confirmation.validate()

      expect(isValid).toBe(true)
    })

    it('should validate when a single string is passed instead of an array', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: 'confirm' })
      const { isValid } = confirmation.validate()

      expect(isValid).toBe(true)
    })

    it('should not validate when not confirmed', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: [] })
      const { isValid, errors } = confirmation.validate()

      expect(isValid).toBe(false)
      expect(errors).toEqual({
        confirmation: {
          text: 'You need to tick a declaration box'
        }
      })
    })
  })

  describe('toState', () => {
    it('should return an object with the correct data (confirm only)', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['confirm'] })
      expect(confirmation.toState()).toEqual(['confirm'])
    })

    it('should return an object with the correct data (other only)', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['other'] })
      expect(confirmation.toState()).toEqual(['other'])
    })

    it('should return an object with the correct data (confirm and other)', () => {
      const confirmation = new ConfirmationAnswer({
        confirmation: ['confirm', 'other']
      })
      expect(confirmation.toState()).toEqual(['confirm', 'other'])
    })
  })

  describe('value', () => {
    it('should return correct value when only confirmed', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['confirm'] })
      expect(confirmation.value).toEqual(['confirm'])
    })

    it('should return correct value when only on behalf of other', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['other'] })
      expect(confirmation.value).toEqual(['other'])
    })

    it('should return correct value when neither confirmed nor on behalf of other', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: [] })
      expect(confirmation.value).toEqual([])
    })

    it('should return correct value when a single string is passed instead of an array', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: 'confirm' })
      expect(confirmation.value).toEqual(['confirm'])
    })
  })

  describe('fromState', () => {
    it('should create a Confirmation instance from state with confirmation array', () => {
      const state = ['confirm']
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with empty confirmation array', () => {
      const state = []
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with confirmation array containing multiple values', () => {
      const state = ['confirm', 'other']
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with undefined confirmation', () => {
      const state = undefined
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual([])
    })
  })
})
