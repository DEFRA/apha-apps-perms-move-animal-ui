import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} Animals42DaysOldOrOlderData
 * @typedef {{ animals42DaysOldOrOlder: Animals42DaysOldOrOlderData }} Animals42DaysOldOrOlderPayload
 */

/**
 * @augments {RadioButtonAnswer<Animals42DaysOldOrOlderPayload>}
 */
export class Animals42DaysOldOrOlderAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'animals42DaysOldOrOlder',
    options: {
      yes: {
        label: 'Yes',
        labelI18nKey:
          'tb.identification.animals42DaysOldOrOlder.options.yes.label'
      },
      no: {
        label: 'No',
        labelI18nKey:
          'tb.identification.animals42DaysOldOrOlder.options.no.label'
      }
    },
    validation: {
      empty: {
        message:
          'Select if you are also moving any animals 42 days old or older',
        i18nKey: 'tb.identification.animals42DaysOldOrOlder.validation.empty'
      }
    },
    layout: 'inline'
  }
}
