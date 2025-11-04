import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { BuildingsHowMinimiseContaminationAnswer } from './buildings-how-minimise-contamination.js'
/** @import {BuildingsHowMinimiseContaminationPayload} from './buildings-how-minimise-contamination.js' */

/** @type {BuildingsHowMinimiseContaminationPayload} */
const payload = {
  buildingsHowMinimiseContamination: ['cleaning']
}

describe('BuildingsHowMinimiseContaminationAnswer', () => {
  it('should be a checkbox answer', () => {
    expect(
      new BuildingsHowMinimiseContaminationAnswer(payload)
    ).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(BuildingsHowMinimiseContaminationAnswer.config.payloadKey).toBe(
      'buildingsHowMinimiseContamination'
    )
  })

  it('should be a page heading', () => {
    expect(BuildingsHowMinimiseContaminationAnswer.config.isPageHeading).toBe(
      true
    )
  })

  it('should define the right empty input message', () => {
    expect(
      BuildingsHowMinimiseContaminationAnswer.config.validation.empty?.message
    ).toBe(
      'Enter how you will reduce the risk of spreading TB from the resident herd to the incoming animals during housing'
    )
  })
})
