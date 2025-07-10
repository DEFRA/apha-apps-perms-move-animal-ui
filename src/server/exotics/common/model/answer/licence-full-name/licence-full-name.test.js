import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { LicenceFullNameAnswer } from './licence-full-name.js'

const payload = {
  firstName: 'some first name',
  lastName: 'some surname'
}

describe('LicenceFullNameAnswer', () => {
  it('should be a Full name input', () => {
    expect(new LicenceFullNameAnswer(payload)).toBeInstanceOf(FullNameAnswer)
  })

  it('should have the right validation options', () => {
    expect(
      LicenceFullNameAnswer.config.validation.firstName.empty?.message
    ).toBe('Enter a first name')
    expect(
      LicenceFullNameAnswer.config.validation.lastName.empty?.message
    ).toBe('Enter a last name')
  })
})
