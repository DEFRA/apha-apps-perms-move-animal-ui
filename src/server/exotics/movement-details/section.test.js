import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '../../common/test-helpers/exotic/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { ReasonPage } from './reason/index.js'
import { MovementDetailsSection } from './section.js'

describe('MovementDetailsSection', () => {
  it('should have the correct configuration', () => {
    expect(MovementDetailsSection.config.key).toBe('movementDetails')
    expect(MovementDetailsSection.config.title).toBe('Movement details')
  })

  it('should have the right check answers page link', () => {
    expect(MovementDetailsSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it('should have the correct first page', () => {
    expect(MovementDetailsSection.firstPageFactory()).toBeInstanceOf(ReasonPage)
  })

  it('should not be enabled if about the movement is not complete', () => {
    expect(MovementDetailsSection.config.isEnabled({})).toBe(false)
  })

  it('should not be enabled if about the movement is complete but it is a visit', () => {
    expect(
      MovementDetailsSection.config.isEnabled({
        about: aboutSectionVisitComplete
      })
    ).toBe(false)
  })

  it('should be enabled if about the movement is complete and it is not a visit', () => {
    expect(
      MovementDetailsSection.config.isEnabled({
        about: aboutSectionNonVisitComplete
      })
    ).toBe(true)
  })

  it('should not be visible if about the movement is not complete', () => {
    expect(MovementDetailsSection.config.isVisible({})).toBe(false)
  })

  it('should not be visible if about the movement is complete but it is a visit', () => {
    expect(
      MovementDetailsSection.config.isVisible({
        about: aboutSectionVisitComplete
      })
    ).toBe(false)
  })

  it('should be visible if about the movement is complete and it is not a visit', () => {
    expect(
      MovementDetailsSection.config.isVisible({
        about: aboutSectionNonVisitComplete
      })
    ).toBe(true)
  })
})
