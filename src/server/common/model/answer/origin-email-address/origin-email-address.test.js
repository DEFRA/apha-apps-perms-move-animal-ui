import { EmailAddressAnswer } from '../email-address/email-address.js'
import { OriginEmailAddressAnswer } from './origin-email-address.js'

describe('OriginEmailAddressAnswer', () => {
  it('should be an email address answer', () => {
    expect(new OriginEmailAddressAnswer()).toBeInstanceOf(EmailAddressAnswer)
  })

  it('should have the correct payload key', () => {
    expect(OriginEmailAddressAnswer.config.payloadKey).toBe('originEmail')
  })

  it('should have the correct type', () => {
    expect(OriginEmailAddressAnswer.config.type).toBe('email')
  })

  it('should define the right validation messages', () => {
    expect(OriginEmailAddressAnswer.config.validation.empty?.message).toBe(
      'Enter the email address for the origin premises'
    )

    expect(OriginEmailAddressAnswer.config.validation.pattern?.message).toBe(
      'Enter the email address in a valid format'
    )

    expect(OriginEmailAddressAnswer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 255 characters'
    )
  })

  it('should have the correct max length', () => {
    expect(OriginEmailAddressAnswer.config.validation.maxLength?.value).toBe(
      255
    )
  })

  it('should strip whitespace', () => {
    expect(OriginEmailAddressAnswer.config.stripWhitespace).toBe(true)
  })
})
