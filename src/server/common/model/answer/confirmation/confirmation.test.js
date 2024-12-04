import { Confirmation } from './confirmation.js'

describe('#ConfirmationModel', () => {
  it('should return valid when only confirmed', () => {
    const confirmation = new Confirmation({ confirmation: ['confirm'] })
    const { isValid } = confirmation.validate()

    expect(isValid).toBe(true)
  })

  it('should return valid when confirmed and on behalf of other', () => {
    const confirmation = new Confirmation({
      confirmation: ['confirm', 'other']
    })
    const { isValid } = confirmation.validate()

    expect(isValid).toBe(true)
  })

  it('should validate when a single string is passed instead of an array', () => {
    const confirmation = new Confirmation({ confirmation: 'confirm' })
    const { isValid } = confirmation.validate()

    expect(isValid).toBe(true)
  })

  it('should not validate when not confirmed', () => {
    const confirmation = new Confirmation({ confirmation: [] })
    const { isValid, errors } = confirmation.validate()

    expect(isValid).toBe(false)
    expect(errors).toEqual({
      confirmation: {
        text: 'You need to tick a declaration box'
      }
    })
  })

  it('should return an object with the correct data (confirm only)', () => {
    const confirmation = new Confirmation({ confirmation: ['confirm'] })
    expect(confirmation.toState()).toEqual({ confirmation: ['confirm'] })
  })

  it('should return an object with the correct data (other only)', () => {
    const confirmation = new Confirmation({ confirmation: ['other'] })
    expect(confirmation.toState()).toEqual({ confirmation: ['other'] })
  })

  it('should return an object with the correct data (confirm and other)', () => {
    const confirmation = new Confirmation({
      confirmation: ['confirm', 'other']
    })
    expect(confirmation.toState()).toEqual({
      confirmation: ['confirm', 'other']
    })
  })
})
