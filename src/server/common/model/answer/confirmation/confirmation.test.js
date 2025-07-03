import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { ConfirmationAnswer } from './confirmation.js'

const payload = { confirmation: ['confirm', 'other'] }

describe('ConfirmationAnswer', () => {
  it('should be a checkbox', () => {
    expect(new ConfirmationAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(ConfirmationAnswer.config.payloadKey).toBe('confirmation')
  })

  it('should define the right empty input message', () => {
    expect(ConfirmationAnswer.config.errors.emptyOptionText?.message).toBe(
      'You need to tick a declaration box'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(ConfirmationAnswer.config.options)).toHaveLength(2)
    expect(ConfirmationAnswer.config.options.confirm.label).toBe(
      'I confirm all the information given about my farm or premises is correct to the best of my knowledge'
    )
    expect(ConfirmationAnswer.config.options.other.label).toBe(
      'I am submitting this form on behalf of someone else and confirm all the information given is correct to the best of my knowledge'
    )
  })

  it('should set the isPageHeading to false', () => {
    expect(ConfirmationAnswer.config.isPageHeading).toBe(false)
  })
})
