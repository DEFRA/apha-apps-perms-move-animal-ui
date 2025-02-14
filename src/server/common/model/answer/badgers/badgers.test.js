import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { BadgersAnswer } from './badgers.js'

const payload = {
  badgers: [
    'badgerProofFencing',
    'aluminiumFeedBins',
    'limitAccessToBadgerHabitat',
    'troughsAbove90cm',
    'licksOutOfReach',
    'other'
  ]
}

describe('BadgersAnswer', () => {
  it('should be a checkbox', () => {
    expect(new BadgersAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(BadgersAnswer.config.payloadKey).toBe('badgers')
  })

  it('should have no validation', () => {
    expect(BadgersAnswer.config.validation).toEqual({})
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(BadgersAnswer.config.options)).toHaveLength(6)
    expect(BadgersAnswer.config.options.badgerProofFencing.label).toBe(
      'Badger proof fencing, such as solid aluminium sheeted gates, aluminium sheeting on rail fences, retractable electric fences'
    )
    expect(BadgersAnswer.config.options.aluminiumFeedBins.label).toBe(
      'Aluminium feed bins'
    )
    expect(BadgersAnswer.config.options.limitAccessToBadgerHabitat.label).toBe(
      'Limiting access to badger latrines and setts'
    )
    expect(BadgersAnswer.config.options.troughsAbove90cm.label).toBe(
      'Feed and water troughs above 90cm'
    )
    expect(BadgersAnswer.config.options.licksOutOfReach.label).toBe(
      'Mineral licks kept out of reach'
    )
    expect(BadgersAnswer.config.options.other.label).toBe(
      'Other decontamination methods'
    )
  })
})
