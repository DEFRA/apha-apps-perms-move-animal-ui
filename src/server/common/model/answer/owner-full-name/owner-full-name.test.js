import { FullNameAnswer } from '../full-name/full-name.js'
import { OwnerFullNameAnswer } from './owner-full-name.js'

describe('OwnerFullNameAnswer', () => {
  it('should be a full name', () => {
    expect(new OwnerFullNameAnswer()).toBeInstanceOf(FullNameAnswer)
  })

  it('should define the right empty input messages', () => {
    expect(OwnerFullNameAnswer.config.validation.firstName.empty?.message).toBe(
      'Enter the first name of the registered owner of the cattle'
    )
    expect(OwnerFullNameAnswer.config.validation.lastName.empty?.message).toBe(
      'Enter the last name of the registered owner of the cattle'
    )
  })
})
