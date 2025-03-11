import { FullNameAnswer } from '../full-name/full-name.js'
import { FullNameFutureAnswer } from './full-name-future.js'
/** @import {FullNameFuturePayload} from './full-name-future.js' */

const maxLength = 50

describe('FullNameFutureAnswer', () => {
  it('should be a full name', () => {
    expect(new FullNameFutureAnswer()).toBeInstanceOf(FullNameAnswer)
  })

  it('should define the right empty input messages', () => {
    expect(
      FullNameFutureAnswer.config.validation.firstName.empty?.message
    ).toBe(
      'Enter the first name of who will be the registered owner of the cattle'
    )
    expect(FullNameFutureAnswer.config.validation.lastName.empty?.message).toBe(
      'Enter the last name of who will be the registered owner of the cattle'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(
      FullNameFutureAnswer.config.validation.firstName.maxLength?.value
    ).toBe(maxLength)
    expect(
      FullNameFutureAnswer.config.validation.firstName.maxLength?.message
    ).toBe('First name must be no longer than 50 characters')
    expect(
      FullNameFutureAnswer.config.validation.lastName.maxLength?.value
    ).toBe(maxLength)
    expect(
      FullNameFutureAnswer.config.validation.lastName.maxLength?.message
    ).toBe('Last name must be no longer than 50 characters')
  })
})
