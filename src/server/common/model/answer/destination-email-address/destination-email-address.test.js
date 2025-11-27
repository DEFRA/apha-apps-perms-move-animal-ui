import { EmailAddressAnswer } from '../email-address/email-address.js'
import { DestinationEmailAddressAnswer } from './destination-email-address.js'

describe('DestinationEmailAddressAnswer', () => {
  it('should be an email address answer', () => {
    expect(new DestinationEmailAddressAnswer()).toBeInstanceOf(
      EmailAddressAnswer
    )
  })

  it('should have the correct payload key', () => {
    expect(DestinationEmailAddressAnswer.config.payloadKey).toBe(
      'destinationEmail'
    )
  })

  it('should have the correct type', () => {
    expect(DestinationEmailAddressAnswer.config.type).toBe('email')
  })

  it('should define the right validation messages', () => {
    expect(DestinationEmailAddressAnswer.config.validation.empty?.message).toBe(
      'Enter your email address'
    )

    expect(
      DestinationEmailAddressAnswer.config.validation.pattern?.message
    ).toBe('Enter the email address in a valid format')

    expect(
      DestinationEmailAddressAnswer.config.validation.maxLength?.message
    ).toBe('Your answer must be no longer than 255 characters')
  })

  it('should have the correct max length', () => {
    expect(
      DestinationEmailAddressAnswer.config.validation.maxLength?.value
    ).toBe(255)
  })

  it('should strip whitespace', () => {
    expect(DestinationEmailAddressAnswer.config.stripWhitespace).toBe(true)
  })
})
