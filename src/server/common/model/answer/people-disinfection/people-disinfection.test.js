import { TextAreaAnswer } from '../text-area/text-area.js'
import { PeopleDisinfectionAnswer } from './people-disinfection.js'
/** @import {PeopleDisinfectionPayload} from './people-disinfection.js' */

const maxLength = 5000

/** @type {PeopleDisinfectionPayload} */
const payload = {
  peopleDisinfection: 'somehow'
}

describe('PeopleDisinfection', () => {
  it('should be a text area', () => {
    expect(new PeopleDisinfectionAnswer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(PeopleDisinfectionAnswer.config.payloadKey).toBe(
      'peopleDisinfection'
    )
  })

  it('should have the right hint', () => {
    expect(PeopleDisinfectionAnswer.config.hint).toBeUndefined()
  })

  it('should have the right number of rows', () => {
    expect(PeopleDisinfectionAnswer.config.rows).toBe(8)
  })

  it('should have not be a page heading', () => {
    expect(PeopleDisinfectionAnswer.config.isPageHeading).toBe(false)
  })

  it('should define the right empty input message', () => {
    expect(PeopleDisinfectionAnswer.config.validation.empty?.message).toBe(
      'Enter what measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(PeopleDisinfectionAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(PeopleDisinfectionAnswer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})
