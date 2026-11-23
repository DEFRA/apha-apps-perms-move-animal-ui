import { RadioButtonAnswer } from '../radio-button/radio-button.js'

/** @import {RadioButtonConfig} from '../radio-button/radio-button.js' */

/**
 * export @typedef {'yes'|'no'} BuildingsAnySharedData
 * @typedef {{ animalsHoused: BuildingsAnySharedData }} BuildingsAnySharedPayload
 */

/**
 * @augments {RadioButtonAnswer<BuildingsAnySharedPayload>}
 */
export class BuildingsAnySharedAnswer extends RadioButtonAnswer {
  /** @type {RadioButtonConfig} */
  static config = {
    payloadKey: 'animalsHoused',
    hint: 'This includes shared spaces such as pens',
    hintI18nKey: 'tb.biosecurity.buildingsAnyShared.hint',
    options: {
      yes: {
        label: 'Yes',
        labelI18nKey: 'tb.biosecurity.buildingsAnyShared.options.yes.label'
      },
      no: {
        label: 'No',
        labelI18nKey: 'tb.biosecurity.buildingsAnyShared.options.no.label'
      }
    },
    validation: {
      empty: 'Select if the animals will be housed'
    },
    layout: 'inline'
  }
}
