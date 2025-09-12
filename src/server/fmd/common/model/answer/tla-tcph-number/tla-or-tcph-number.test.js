import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { TlaOrTcphNumberAnswer } from './tla-or-tcph-number.js'
import { cphNumberRegex } from '~/src/server/common/model/answer/cph-number/cph-number.js'

/** @import {CphNumberPayload} from '~/src/server/common/model/answer/cph-number/cph-number.js' */

const maxLength = 11
const invalidTlaOrTcphNumberError =
  'Enter the TLA or tCPH number in the correct format, for example, 12/345/6789'

/** @type {CphNumberPayload} */
const payload = {
  cphNumber: '11/222/3333'
}

describe('TlaOrTcphNumberAnswer', () => {
  it('should be a text input', () => {
    expect(new TlaOrTcphNumberAnswer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(TlaOrTcphNumberAnswer.config.payloadKey).toBe('tlaOrTcphNumber')
  })

  it('should define the right empty input message', () => {
    expect(TlaOrTcphNumberAnswer.config.validation.empty?.message).toBe(
      'Enter the TLA or tCPH number'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(TlaOrTcphNumberAnswer.config.validation.maxLength?.value).toBe(
      maxLength
    )
    expect(TlaOrTcphNumberAnswer.config.validation.maxLength?.message).toBe(
      invalidTlaOrTcphNumberError
    )
  })

  it('should define the right pattern and corresponding error message', () => {
    expect(TlaOrTcphNumberAnswer.config.validation.pattern?.regex).toBe(
      cphNumberRegex
    )
    expect(TlaOrTcphNumberAnswer.config.validation.pattern?.message).toBe(
      invalidTlaOrTcphNumberError
    )
  })
})
