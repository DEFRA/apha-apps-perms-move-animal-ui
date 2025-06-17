import { TextAnswer } from '../text/text.js'
import { OriginTypeOtherAnswer } from './origin-type-other.js'
/** @import {OriginTypeOtherPayload} from './origin-type-other.js' */

const maxLength = 5000

/** @type {OriginTypeOtherPayload} */
const payload = {
  originTypeOther: 'other origin type'
}

describe('OriginTypeOther', () => {
  it('should be a text area', () => {
    expect(new OriginTypeOtherAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(OriginTypeOtherAnswer.config.payloadKey).toBe('originTypeOther')
  })

  it('should have the right number of rows', () => {
    expect(OriginTypeOtherAnswer.config.characterWidth).toBe(20)
  })

  it('should define the right max length and corresponding error message', () => {
    expect(OriginTypeOtherAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(OriginTypeOtherAnswer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should not specify an empty validation message', () => {
    expect(OriginTypeOtherAnswer.config.validation.empty?.message).toBe(
      'Enter the premises type'
    )
  })

  it('should return the HTML when additionalInfo is not empty', () => {
    const answer = new OriginTypeOtherAnswer({
      originTypeOther: 'Some info'
    })
    expect(answer.emailHtml).toBe('Some info')
  })

  it('should return escaped HTML when additionalInfo is not empty', () => {
    const answer = new OriginTypeOtherAnswer({
      originTypeOther: '[evil-link](example.com)'
    })
    expect(answer.emailHtml).toBe('\\[evil-link\\]\\(example.com\\)')
  })
})
