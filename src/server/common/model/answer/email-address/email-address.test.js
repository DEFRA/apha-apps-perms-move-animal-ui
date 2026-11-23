import { config } from '~/src/config/config.js'
import { spyOnConfig } from '../../../test-helpers/config.js'
import { BaseEmailAddressAnswer } from '../base-email-address/base-email-address.js'
import { EmailAddressAnswer } from './email-address.js'

describe('EmailAddress', () => {
  it('should be an email address answer', () => {
    expect(new EmailAddressAnswer()).toBeInstanceOf(BaseEmailAddressAnswer)
  })

  it('should have the correct payload key', () => {
    expect(EmailAddressAnswer.config.payloadKey).toBe('emailAddress')
  })

  it('should have the correct type', () => {
    expect(EmailAddressAnswer.config.type).toBe('email')
  })

  it('should define the right validation messages', () => {
    expect(EmailAddressAnswer.config.validation.empty?.message).toBe(
      'Enter the email address you would like the licence sent to'
    )

    expect(EmailAddressAnswer.config.validation.pattern?.message).toBe(
      'Enter an email address in the correct format, like name@example.com'
    )

    expect(EmailAddressAnswer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 255 characters'
    )
  })

  it('should have the correct max length', () => {
    expect(EmailAddressAnswer.config.validation.maxLength?.value).toBe(255)
  })

  it('should strip whitespace', () => {
    expect(EmailAddressAnswer.config.stripWhitespace).toBe(true)
  })

  it('uses the licence email message for an invalid email', () => {
    spyOnConfig('featureFlags', {
      ...config.get('featureFlags'),
      emailConfirmation: false
    })
    const payload = { emailAddress: 'not-an-email' }
    const answer = new EmailAddressAnswer(payload)
    const { errors } = answer.validate()
    jest.restoreAllMocks()

    expect(errors.emailAddress.text).toBe(
      'Enter an email address in the correct format, like name@example.com'
    )
  })

  describe('confirmation email hint', () => {
    let originalAnswerConfig

    beforeEach(() => {
      originalAnswerConfig = { ...EmailAddressAnswer.config }
    })

    afterEach(() => {
      EmailAddressAnswer.config = originalAnswerConfig
      jest.restoreAllMocks()
    })

    it('does not show a hint when email confirmation is disabled', async () => {
      spyOnConfig('featureFlags', {
        ...config.get('featureFlags'),
        emailConfirmation: false
      })
      const translate = jest.fn()
      const answer = new EmailAddressAnswer()

      expect(answer.config.hint).toBeUndefined()
      expect(answer.config.hintI18nKey).toBeUndefined()
      const viewModel = await answer.viewModel({ question: 'Email', translate })
      expect(viewModel.hint).toBeUndefined()
      expect(translate).not.toHaveBeenCalled()
    })

    it('shows the translated hint when email confirmation is enabled', async () => {
      spyOnConfig('featureFlags', {
        ...config.get('featureFlags'),
        emailConfirmation: true
      })
      const translate = jest.fn().mockReturnValue('Translated hint')
      const answer = new EmailAddressAnswer()

      const viewModel = await answer.viewModel({ question: 'Email', translate })

      expect(translate).toHaveBeenCalledWith(
        'common.answer.emailAddress.hint',
        'A confirmation email will also be sent to this email address'
      )
      expect(viewModel.hint).toEqual({ text: 'Translated hint' })
    })
  })
})
