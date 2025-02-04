import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { OriginTypeAnswer } from './origin-type.js'
/** @import {OriginTypePayload} from './origin-type.js' */

/** @type {OriginTypePayload} */
const payload = {
  originType: 'afu'
}

describe('OriginType', () => {
  it('should be a radio button', () => {
    expect(new OriginTypeAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(OriginTypeAnswer.config.payloadKey).toBe('originType')
  })

  it('should define the right empty input message', () => {
    expect(OriginTypeAnswer.config.errors.emptyOptionText).toBe(
      'Select where the animals are moving from'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(OriginTypeAnswer.config.options)).toHaveLength(3)
    expect(OriginTypeAnswer.config.options['tb-restricted-farm'].label).toBe(
      'TB restricted farm'
    )
    expect(OriginTypeAnswer.config.options.afu.label).toBe(
      'Approved finishing unit (AFU)'
    )
    expect(OriginTypeAnswer.config.options.other.label).toBe(
      'Another type of premises'
    )
  })
})
