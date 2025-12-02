import { FullNameAnswer } from '../full-name/full-name.js'
import { YourNameAnswer } from './your-name.js'

describe('YourNameAnswer', () => {
  it('should be a full name', () => {
    expect(new YourNameAnswer()).toBeInstanceOf(FullNameAnswer)
  })

  it('should define the right empty input messages', () => {
    expect(YourNameAnswer.config.validation.firstName.empty?.message).toBe(
      'Enter your first name'
    )
    expect(YourNameAnswer.config.validation.lastName.empty?.message).toBe(
      'Enter your last name'
    )
  })
})
