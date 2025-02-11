import { TextAreaAnswer } from '../text-area/text-area.js'
import { BuildingsHowMinimiseContaminationAnswer } from './buildings-how-minimise-contamination.js'
/** @import {BuildingsHowMinimiseContaminationPayload} from './buildings-how-minimise-contamination.js' */

const maxLength = 5000

/** @type {BuildingsHowMinimiseContaminationPayload} */
const payload = {
  buildingsHowMinimiseContamination: 'somehow'
}

describe('BuildingsHowMinimiseContamination', () => {
  it('should be a text area', () => {
    expect(new BuildingsHowMinimiseContaminationAnswer(payload)).toBeInstanceOf(
      TextAreaAnswer
    )
  })

  it('should have the right payload key', () => {
    expect(BuildingsHowMinimiseContaminationAnswer.config.payloadKey).toBe(
      'buildingsHowMinimiseContamination'
    )
  })

  it('should have the right hint', () => {
    expect(BuildingsHowMinimiseContaminationAnswer.config.hint).toBe(
      'For example, disinfection points and measures taken when milking dairy cattle'
    )
  })

  it('should define the right empty input message', () => {
    expect(
      BuildingsHowMinimiseContaminationAnswer.config.validation.empty.message
    ).toBe('Enter information about how you will reduce building contamination')
  })

  it('should define the right max length and corresponding error message', () => {
    expect(
      BuildingsHowMinimiseContaminationAnswer.config.validation.maxLength.value
    ).toBe(maxLength)
    expect(
      BuildingsHowMinimiseContaminationAnswer.config.validation.maxLength
        .message
    ).toBe('Your answer must be no longer than 5000 characters')
  })
})
