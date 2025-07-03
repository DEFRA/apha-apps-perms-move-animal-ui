import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { PeopleDisinfectionAnswer } from './people-disinfection.js'
/** @import {PeopleDisinfectionPayload} from './people-disinfection.js' */

/** @type {PeopleDisinfectionPayload} */
const payload = {
  peopleDisinfection: [
    'ppe',
    'disinfectingBoots',
    'disinfectingOnArrivalAndDeparture',
    'dedicatedStaff',
    'other'
  ]
}

describe('PeopleDisinfectionAnswer', () => {
  it('should be a checkbox', () => {
    expect(new PeopleDisinfectionAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(PeopleDisinfectionAnswer.config.payloadKey).toBe(
      'peopleDisinfection'
    )
  })

  it('should have no validation', () => {
    expect(PeopleDisinfectionAnswer.config.errors).toEqual({})
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(PeopleDisinfectionAnswer.config.options)).toHaveLength(5)
    expect(PeopleDisinfectionAnswer.config.options.ppe.label).toBe(
      'Dedicated clothing and personal protective equipment (PPE)'
    )
    expect(
      PeopleDisinfectionAnswer.config.options.disinfectingBoots.label
    ).toBe('Cleaning and disinfecting wellington boots, including foot dips')
    expect(
      PeopleDisinfectionAnswer.config.options.disinfectingOnArrivalAndDeparture
        .label
    ).toBe(
      'Cleaning and disinfection measures when contractor arrive and leave'
    )
    expect(PeopleDisinfectionAnswer.config.options.dedicatedStaff.label).toBe(
      'Dedicated staff looking after the incoming animals'
    )
    expect(PeopleDisinfectionAnswer.config.options.other.label).toBe(
      'Other cleaning and disinfection measures'
    )
  })
})
