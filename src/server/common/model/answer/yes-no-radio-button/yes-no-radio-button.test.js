import { RadioButtonAnswer } from '../radio-button/radio-button.js'
import { yesNoRadioButtonFactory } from './yes-no-radio-button.js'
/** @import {YesNoRadioButtonPayload, YesNoRadioButtonOptions} from './yes-no-radio-button.js' */

/** @type {YesNoRadioButtonPayload} */
const payload = {
  yesOrNo: 'yes'
}
const emptyOptionText = 'Select if you are a test case?'

/** @type {YesNoRadioButtonOptions} */
const options = {
  payloadKey: 'test_key',
  emptyOptionText,
  layout: 'inline'
}

describe('YesNoRadioButton', () => {
  const YesNoRadioButton = yesNoRadioButtonFactory(options)

  it('should be an instance of radio button', () => {
    expect(new YesNoRadioButton(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have same static config & instance config', () => {
    expect(new YesNoRadioButton(payload).config).toEqual(
      YesNoRadioButton.config
    )
  })

  it('should have the right payload key', () => {
    expect(YesNoRadioButton.config.payloadKey).toBe(options.payloadKey)
  })

  it('should define the right empty input message', () => {
    expect(YesNoRadioButton.config.errors.emptyOptionText).toBe(emptyOptionText)
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(YesNoRadioButton.config.options)).toHaveLength(2)
    expect(YesNoRadioButton.config.options.yes.label).toBe('Yes')
    expect(YesNoRadioButton.config.options.no.label).toBe('No')
  })
})
