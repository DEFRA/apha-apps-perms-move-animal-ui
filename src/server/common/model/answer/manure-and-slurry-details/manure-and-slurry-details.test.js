import { TextAreaAnswer } from '../text-area/text-area.js'
import { ManureAndSlurryDetailsAnswer } from './manure-and-slurry-details.js'
/** @import { ManureAndSlurryDetailsPayload } from './manure-and-slurry-details.js' */

const maxLength = 5000

/** @type {ManureAndSlurryDetailsPayload} */
const payload = {
  manureAndSlurryDetails: 'yesterday'
}

describe('ManureAndSlurryDetails', () => {
  it('should be a text area', () => {
    expect(new ManureAndSlurryDetailsAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(ManureAndSlurryDetailsAnswer.config.payloadKey).toBe(
      'manureAndSlurryDetails'
    )
  })

  it('should have the right hint text', () => {
    expect(ManureAndSlurryDetailsAnswer.config.hint).toBe(
      'For example, preventing animal access to stores and how manure or slurry is spread onto grazing fields to reduce TB risk to incoming animals'
    )
  })

  it('should be the expected height', () => {
    expect(ManureAndSlurryDetailsAnswer.config.rows).toBe(8)
  })

  it('should define the right empty input message', () => {
    expect(ManureAndSlurryDetailsAnswer.config.validation.empty?.message).toBe(
      'Enter how you will manage manure and slurry'
    )
  })

  it('should define the right max length and corresponding error message', () => {
    expect(ManureAndSlurryDetailsAnswer.config.validation.maxLength.value).toBe(
      maxLength
    )
    expect(
      ManureAndSlurryDetailsAnswer.config.validation.maxLength.message
    ).toBe('Your answer must be no longer than 5000 characters')
  })
})
