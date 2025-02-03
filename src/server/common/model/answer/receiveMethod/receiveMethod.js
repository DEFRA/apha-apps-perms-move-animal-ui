import { RadioButtonAnswer } from '../radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/** @type {RadioButtonConfig} */
const config = {
  payloadKey: 'receiveMethod',
  options: {
    email: { label: 'Email' },
    post: { label: 'Post' }
  },
  errors: {
    emptyOptionText: 'Select how you would like this licence sent to you'
  }
}

/**
 * export @typedef {string} ReceiveMethodData
 * @typedef {{ receiveMethod: string }} ReceiveMethodPayload
 */

/** @augments {RadioButtonAnswer<ReceiveMethodPayload>} */
export class ReceiveMethodAnswer extends RadioButtonAnswer {
  static config = config
}
