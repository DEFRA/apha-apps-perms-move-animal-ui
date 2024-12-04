import { EmailAddress } from './email-address.js'

const validEmailAddressPayload = {
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

describe('EmailAddress', () => {
  describe('validate', () => {
    validEmailAddresses.forEach((email) => {
      it(`should return true for valid email address ${email}`, () => {
        const emailAddress = new EmailAddress({ emailAddress: email })
        const { isValid, errors } = emailAddress.validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    it('should return false for an empty input', () => {
      const emailAddress = new EmailAddress({})

      const { isValid, errors } = emailAddress.validate()

      expect(isValid).toBe(false)
      expect(errors.emailAddress.text).toBe(
        'Enter the email address you would like the licence sent to'
      )
    })

    invalidEmailAddresses.forEach((email) => {
      it(`should return false for invalid email address: ${email}`, () => {
        const emailAddress = new EmailAddress({
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

  describe('toState', () => {
    it('should replace missing data with blank string', () => {
      const emailAddress = new EmailAddress({})
      const data = emailAddress.toState()

      expect(data).toBe('')
    })

    it('should pass through valid data unaltered', () => {
      const emailAddress = new EmailAddress(validEmailAddressPayload)
      const data = emailAddress.toState()

      expect(data).toEqual(validEmailAddressPayload.emailAddress)
    })

    it('should remove whitespace', () => {
      const emailAddress = new EmailAddress({
        emailAddress: '  test @ domain.com '
      })

      expect(emailAddress.toState()).toBe('test@domain.com')
    })
  })

  describe('fromState', () => {
    it('should return just the email address from the payload', () => {
      const emailAddress = new EmailAddress(validEmailAddressPayload)
      const state = emailAddress.toState()
      expect(EmailAddress.fromState(state).value).toEqual(
        validEmailAddressPayload.emailAddress
      )
    })

    it('should return an undefined value if the state is undefined', () => {
      expect(EmailAddress.fromState(undefined).value).toBeUndefined()
    })

    it('should return an empty object if the state is undefined', () => {
      expect(EmailAddress.fromState(undefined)._data).toEqual({})
    })
  })
})
