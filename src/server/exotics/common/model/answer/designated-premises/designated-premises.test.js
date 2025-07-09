import { DesignatedPremisesAnswer } from './designated-premises.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
/** @import {DesignatedPremisesPayload} from './designated-premises.js' */

/** @type {DesignatedPremisesPayload} */
const payload = {
  isDesignatedPremises: 'yes'
}

describe('DesignatedPremisesAnswer', () => {
  it('should be a radio button', () => {
    expect(new DesignatedPremisesAnswer(payload)).toBeInstanceOf(
      RadioButtonAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(DesignatedPremisesAnswer.config.payloadKey).toBe(
      'isDesignatedPremises'
    )
  })

  it('should have the right hint', () => {
    expect(DesignatedPremisesAnswer.config.hint).toBe(
      'A designated premises has government approval to undertake certain animal-related activities, such as moving eggs.'
    )
  })

  it('should have the right options in config', () => {
    expect(DesignatedPremisesAnswer.config.options).toEqual({
      yes: { label: 'Yes' },
      no: { label: 'No' },
      unknown: { label: "I don't know" }
    })
  })

  it('should define the right empty input message', () => {
    expect(DesignatedPremisesAnswer.config.validation.empty).toBe(
      'Select if the premises is designated'
    )
  })
})
