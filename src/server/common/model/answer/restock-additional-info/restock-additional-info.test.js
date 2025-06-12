import { TextAreaAnswer } from '../text-area/text-area.js'
import { RestockAdditionalInfoAnswer } from './restock-additional-info.js'
/** @import {AdditionalInfoPayload} from './restock-additional-info.js' */

const maxLength = 5000

/** @type {AdditionalInfoPayload} */
const payload = {
  restockAdditionalInfo: 'yesterday'
}

describe('AdditionalInfo', () => {
  it('should be a text area', () => {
    expect(new RestockAdditionalInfoAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(RestockAdditionalInfoAnswer.config.payloadKey).toBe(
      'restockAdditionalInfo'
    )
  })

  it('should have the right number of rows', () => {
    expect(RestockAdditionalInfoAnswer.config.rows).toBe(5)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(RestockAdditionalInfoAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(
      RestockAdditionalInfoAnswer.config.validation.maxLength.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })

  it('should not specify an empty validation message', () => {
    expect(RestockAdditionalInfoAnswer.config.validation.empty?.message).toBe(
      'Enter the reason for restocking'
    )
  })

  it('should return "None" when additionalInfo is an empty string', () => {
    const answer = new RestockAdditionalInfoAnswer({
      restockAdditionalInfo: ''
    })
    expect(answer.emailHtml).toBe('None')
  })

  it('should return the HTML when additionalInfo is not empty', () => {
    const answer = new RestockAdditionalInfoAnswer({
      restockAdditionalInfo: 'Some info'
    })
    expect(answer.emailHtml).toBe('Some info')
  })

  it('should return escaped HTML when additionalInfo is not empty', () => {
    const answer = new RestockAdditionalInfoAnswer({
      restockAdditionalInfo: '[evil-link](example.com)'
    })
    expect(answer.emailHtml).toBe('\\[evil-link\\]\\(example.com\\)')
  })
})
