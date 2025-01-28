import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */


/**
 * export @typedef {'yes' | 'no'} YesNoRadioButtonData
 * @typedef {{ yesOrNo: 'yes' | 'no' }} YesNoRadioButtonPayload
 */


export const yesNoRadioButtonFactory = ({ emptyOptionText }) => {
  /** @type {RadioButtonConfig} */
  const yesNoRadio = {
    payloadKey: 'yesOrNo',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' }
    },
    errors: {
      emptyOptionText
    }
  }

  /** @augments {RadioButtonAnswer<YesNoRadioButtonPayload>} */
  class YesNoAnswer extends RadioButtonAnswer {
    get config() {
      return yesNoRadio
    }

    static get config() {
      return yesNoRadio
    }
  }

  return YesNoAnswer
}
