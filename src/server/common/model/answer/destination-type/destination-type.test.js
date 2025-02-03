import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { DestinationTypeAnswer } from './destination-type.js'
/** @import {DestinationTypePayload} from './destination-type.js' */

/** @type {DestinationTypePayload} */
const payload = {
  destinationType: 'slaughter'
}

describe('DestinationType', () => {
  it('should be a radio button', () => {
    expect(new DestinationTypeAnswer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(DestinationTypeAnswer.config.payloadKey).toBe('destinationType')
  })

  it('should define the right empty input message', () => {
    expect(DestinationTypeAnswer.config.errors.emptyOptionText).toBe(
      'Select where the animals are going'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(DestinationTypeAnswer.config.options)).toHaveLength(4)
    expect(DestinationTypeAnswer.config.options.slaughter.label).toBe(
      'Slaughter'
    )
    expect(DestinationTypeAnswer.config.options['dedicated-sale'].label).toBe(
      'Dedicated sale for TB (orange market)'
    )
    expect(DestinationTypeAnswer.config.options.afu.label).toBe(
      'Approved finishing unit (AFU)'
    )
    expect(DestinationTypeAnswer.config.options.other.label).toBe(
      'Another destination'
    )
  })
})
