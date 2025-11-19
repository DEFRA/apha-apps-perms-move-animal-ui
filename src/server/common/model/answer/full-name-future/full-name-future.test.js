import { FullNameAnswer } from '../full-name/full-name.js'
import { FullNameFutureAnswer } from './full-name-future.js'

describe('FullNameFutureAnswer', () => {
  it('should be a full name', () => {
    expect(new FullNameFutureAnswer()).toBeInstanceOf(FullNameAnswer)
  })

  it('should define the right empty input messages', () => {
    expect(
      FullNameFutureAnswer.config.validation.firstName.empty?.message
    ).toBe(
      'Enter the first name of the person who will be the registered keeper of the animals'
    )
    expect(FullNameFutureAnswer.config.validation.lastName.empty?.message).toBe(
      'Enter the last name of the person who will be the registered keeper of the animals'
    )
  })
})
