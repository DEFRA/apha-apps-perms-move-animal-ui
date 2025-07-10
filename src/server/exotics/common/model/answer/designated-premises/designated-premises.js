import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
/** @import {RadioButtonConfig} from '~/src/server/common/model/answer/radio-button/radio-button.js' */

/**
 * @typedef {{ isDesignatedPremises: string }} DesignatedPremisesPayload
 */

/**
 * @augments {RadioButtonAnswer<DesignatedPremisesPayload>}
 */
export class DesignatedPremisesAnswer extends RadioButtonAnswer {
  /** @type { RadioButtonConfig } */
  static config = {
    payloadKey: 'isDesignatedPremises',
    hint: 'A designated premises has government approval to undertake certain animal-related activities, such as moving eggs',
    options: {
      yes: { label: 'Yes' },
      no: { label: 'No' },
      unknown: { label: "I don't know" }
    },
    validation: {
      empty: 'Select if the premises is designated'
    }
  }
}
