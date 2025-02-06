import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/**
 * @import {RadioButtonConfig, RadioButtonLayout} from '../radio-button/radio-button.js'
 */

/**
 * export @typedef {'yes' | 'no'} YesNoRadioButtonData
 * @typedef {{ yesOrNo: 'yes' | 'no' }} YesNoRadioButtonPayload
 * @typedef {{ payloadKey: string, emptyOptionText: string, layout: RadioButtonLayout }} YesNoRadioButtonOptions
 */

/**
 *
 * @param { YesNoRadioButtonOptions } options
 * @returns
 */
export const yesNoRadioButtonFactory = ({
  payloadKey,
  emptyOptionText,
  layout
}) => {
  /** @type {RadioButtonConfig} */
  const yesNoRadio = {
    payloadKey,
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText
    },
    layout
  }

  /** @augments {RadioButtonAnswer<YesNoRadioButtonPayload>} */
  class YesNoAnswer extends RadioButtonAnswer {
    static config = yesNoRadio
  }

  return YesNoAnswer
}
