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
      expect(confirmation.toState()).toEqual({ confirmation: ['confirm'] })
    })

    it('should return an object with the correct data (other only)', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['other'] })
      expect(confirmation.toState()).toEqual({ confirmation: ['other'] })
    })

    it('should return an object with the correct data (confirm and other)', () => {
      const confirmation = new ConfirmationAnswer({
        confirmation: ['confirm', 'other']
      })
      expect(confirmation.toState()).toEqual({
        confirmation: ['confirm', 'other']
      })
    })
  })

  describe('value', () => {
    it('should return correct value when only confirmed', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['confirm'] })
      expect(confirmation.value).toEqual({ confirm: true, other: false })
    })

    it('should return correct value when only on behalf of other', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: ['other'] })
      expect(confirmation.value).toEqual({ confirm: false, other: true })
    })

    it('should return correct value when neither confirmed nor on behalf of other', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: [] })
      expect(confirmation.value).toEqual({ confirm: false, other: false })
    })

    it('should return correct value when a single string is passed instead of an array', () => {
      const confirmation = new ConfirmationAnswer({ confirmation: 'confirm' })
      expect(confirmation.value).toEqual({ confirm: true, other: false })
    })
  })

  describe('html', () => {
    it('should return the hardcoded html string', () => {
      const confirmation = new ConfirmationAnswer()
      expect(confirmation.html).toBe('confirmation html')
    })
  })

  describe('fromState', () => {
    it('should create a Confirmation instance from state with confirmation array', () => {
      const state = { confirmation: ['confirm'] }
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with empty confirmation array', () => {
      const state = { confirmation: [] }
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with confirmation array containing multiple values', () => {
      const state = { confirmation: ['confirm', 'other'] }
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual(state)
    })

    it('should create a Confirmation instance from state with undefined confirmation', () => {
      const state = undefined
      const confirmation = ConfirmationAnswer.fromState(state)
      expect(confirmation).toBeInstanceOf(ConfirmationAnswer)
      expect(confirmation.toState()).toEqual({ confirmation: [] })
    })
  })
})
