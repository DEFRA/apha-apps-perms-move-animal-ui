import { TextAnswer } from '../text/text.js'
import { BaseEmailAddressAnswer } from './base-email-address.js'

/** @import {BaseEmailAddressPayload} from './base-email-address.js' */

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
  'email@domain.co.jp',
  'firstname-lastname@domain.com',
  'technically..valid@domain.com'
]
const invalidEmailAddresses = [
  'info@german-financial-services.vermögensberatung',
  'japanese-info@例え.テスト',
  'info@german-financial-services.reallylongarbitrarytldthatiswaytoohugejustincase',
  'plainaddress',
  '@no-local-part.com',
  'no-at.domain.com',
  'email@domain.superlongtld',
  'name(withopeningparenthesis@domain.com',
  'name)withclosingparenthesis@domain.com',
  'john<lowerthan@domain.com',
  'john>greaterthan@domain.com',
  'openingbrackets[john@domain.com',
  'closingbrackets]john@domain.com',
  'colon:name@domain.com',
  'semicolon;name@domain.com',
  'two@@domain.com',
  'back\\slash@domain.com',
  'comma,name@domain.com',
  'quote"name@domain.com'
]

describe('BaseEmailAddress', () => {
  it('should be a text input', () => {
    expect(new BaseEmailAddressAnswer(validPayload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(BaseEmailAddressAnswer.config.payloadKey).toBe('emailAddress')
  })

  it('should autocomplete', () => {
    expect(BaseEmailAddressAnswer.config.autocomplete).toBe('email-address')
  })

  it('should strip whitespace', () => {
    expect(BaseEmailAddressAnswer.config.stripWhitespace).toBe(true)
  })

  it('should have an input type of email', () => {
    expect(BaseEmailAddressAnswer.config.type).toBe('email')
  })

  it('should display with a char width of 20', () => {
    expect(BaseEmailAddressAnswer.config.characterWidth).toBe(20)
  })

  describe('viewModel translation', () => {
    class EmailWithHint extends BaseEmailAddressAnswer {
      static config = {
        ...BaseEmailAddressAnswer.config,
        hint: 'Enter an email address'
      }
    }

    class EmailWithTranslatedHint extends EmailWithHint {
      static config = {
        ...EmailWithHint.config,
        hintI18nKey: 'test.email.hint'
      }
    }

    it('should translate a configured hint', async () => {
      const translate = jest.fn().mockReturnValue('Translated hint')
      const answer = new EmailWithTranslatedHint(validPayload)
      const viewModel = await answer.viewModel({ question: 'Email', translate })

      expect(translate).toHaveBeenCalledWith(
        'test.email.hint',
        'Enter an email address'
      )
      expect(viewModel.hint.text).toBe('Translated hint')
    })

    it('should use the hint fallback when no key is configured', async () => {
      const translate = jest.fn((_key, fallback) => fallback)
      const answer = new EmailWithHint(validPayload)
      const viewModel = await answer.viewModel({ question: 'Email', translate })

      expect(translate).toHaveBeenCalledWith(
        undefined,
        'Enter an email address'
      )
      expect(viewModel.hint.text).toBe('Enter an email address')
    })
  })

  describe('#BaseEmailAddress.validate', () => {
    validEmailAddresses.forEach((email) => {
      it(`should return true for valid email address ${email}`, () => {
        const emailAddress = new BaseEmailAddressAnswer({ emailAddress: email })
        const { isValid, errors } = emailAddress.validate()

        expect(isValid).toBe(true)
        expect(errors).toEqual({})
      })
    })

    it('should return false for an empty input', () => {
      const emailAddress = new BaseEmailAddressAnswer(
        /** @type {BaseEmailAddressPayload} */ ({})
      )

      const { isValid, errors } = emailAddress.validate()

      expect(isValid).toBe(false)
      expect(errors.emailAddress.text).toBe('Enter the email address')
    })

    it('uses the standard message when the email is too long', () => {
      const emailAddress = new BaseEmailAddressAnswer({
        emailAddress: `${'a'.repeat(250)}@example.com`
      })

      expect(emailAddress.validate().errors.emailAddress.text).toBe(
        'Your answer must be no longer than 255 characters'
      )
    })

    invalidEmailAddresses.forEach((email) => {
      it(`should return false for invalid email address: ${email}`, () => {
        const emailAddress = new BaseEmailAddressAnswer({
          emailAddress: email
        })

        const { isValid, errors } = emailAddress.validate()

        expect(isValid).toBe(false)
        expect(errors.emailAddress.text).toBe(
          'Enter the email address in a valid format'
        )
      })
    })
  })
})
