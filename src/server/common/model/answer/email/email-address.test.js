import { TextAnswer } from '../text/text.js'
import { EmailAddressAnswer } from './email-address.js'

/** @import {EmailAddressPayload} from './email-address.js' */

const validPayload = {
  emailAddress: 'test@somewhere.com'
}

const validEmailAddresses = [
  'email@domain.com',
  'email@domain.COM',
  'firstname.lastname@domain.com',
  "firstname.o'lastname@domain.com",
  'email@subdomain.domain.com',
  'firstname+lastname@domain.com',
  '1234567890@domain.com',
  'email@domain-one.com',
  'email-with-dash@domain-one.com',
  '_______@domain.com',
  'email@domain.name',
  'email@domain.superlongtld',
  'email@domain.co.jp',
  'firstname-lastname@domain.com',
  'info@german-financial-services.reallylongarbitrarytldthatiswaytoohugejustincase',
  'technically..valid@domain.com',
  'info@german-financial-services.vermögensberatung',
  'japanese-info@例え.テスト'
]
const invalidEmailAddresses = [
  'plainaddress',
  '@no-local-part.com',
  'no-at.domain.com'
]

describe('EmailAddressAnswer', () => {
  it('should be a text input', () => {
    expect(new EmailAddressAnswer(validPayload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(EmailAddressAnswer.config.payloadKey).toBe('emailAddress')
  })

  it('should autocomplete', () => {
    expect(EmailAddressAnswer.config.autocomplete).toBe('email-address')
  })

  it('should strip whitespace', () => {
    expect(EmailAddressAnswer.config.stripWhitespace).toBe(true)
  })

  it('should have an input type of email', () => {
    expect(EmailAddressAnswer.config.type).toBe('email')
  })

  it('should display with a char width of 20', () => {
    expect(EmailAddressAnswer.config.characterWidth).toBe(20)
  })

  describe('#EmailAddressAnswer.validate', () => {
    validEmailAddresses.forEach((email) => {
      it(`should return true for valid email address ${email}`, () => {
        const emailAddress = new EmailAddressAnswer({ emailAddress: email })
        const { isValid, errors } = emailAddress.validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    it('should return false for an empty input', () => {
      const emailAddress = new EmailAddressAnswer(
        /** @type {EmailAddressPayload} */ ({})
      )

      const { isValid, errors } = emailAddress.validate()

      expect(isValid).toBe(false)
      expect(errors.emailAddress.text).toBe(
        'Enter the email address you would like the licence sent to'
      )
    })

    invalidEmailAddresses.forEach((email) => {
      it(`should return false for invalid email address: ${email}`, () => {
        const emailAddress = new EmailAddressAnswer({
          emailAddress: email
        })

        const { isValid, errors } = emailAddress.validate()

        expect(isValid).toBe(false)
        expect(errors.emailAddress.text).toBe(
          'Enter an email address in the correct format, like name@example.com'
        )
      })
    })
  })
})
