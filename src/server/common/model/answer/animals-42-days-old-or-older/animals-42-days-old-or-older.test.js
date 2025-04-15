import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { Animals42DaysOldOrOlderAnswer } from './animals-42-days-old-or-older.js'
/** @import {Animals42DaysOldOrOlderPayload} from './animals-42-days-old-or-older.js' */

/** @type {Animals42DaysOldOrOlderPayload} */
const payload = {
  animals42DaysOldOrOlder: 'yes'
}

describe('Animals42DaysOldOrOlder', () => {
  it('should be a radio button', () => {
    expect(new Animals42DaysOldOrOlderAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(Animals42DaysOldOrOlderAnswer.config.payloadKey).toBe(
      'animals42DaysOldOrOlder'
    )
  })

  it('should define the right empty input message', () => {
    expect(Animals42DaysOldOrOlderAnswer.config.errors.emptyOptionText).toBe(
      'Select if you are also moving any animals 42 days old or older'
    )
  })

  it('should have the expected options to select from', () => {
    expect(
      Object.keys(Animals42DaysOldOrOlderAnswer.config.options)
    ).toHaveLength(2)
    expect(Animals42DaysOldOrOlderAnswer.config.options.yes.label).toBe('Yes')
    expect(Animals42DaysOldOrOlderAnswer.config.options.no.label).toBe('No')
  })
})
