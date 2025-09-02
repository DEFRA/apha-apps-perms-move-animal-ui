import { checkAnswersPage } from './check-answers/index.js'
import { LocationOfVisitPage } from './type-of-location/index.js'
import { LocationOfVisitSection } from './section.js'
import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '../../common/test-helpers/exotic/journey-state.js'

describe('LocationOfVisitSection', () => {
  it('should have the correct configuration', () => {
    expect(LocationOfVisitSection.config.key).toBe('locationOfVisit')
    expect(LocationOfVisitSection.config.title).toBe('Location of visit')
  })

  it('should have the right check answers page link', () => {
    expect(LocationOfVisitSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it('should have the correct first page', () => {
    expect(LocationOfVisitSection.firstPageFactory()).toBeInstanceOf(
      LocationOfVisitPage
    )
  })

  it('should not be enabled if about the movement is not complete', () => {
    expect(LocationOfVisitSection.config.isEnabled({})).toBe(false)
  })

  it('should not be enabled if about the movement is complete and it is not a visit', () => {
    expect(
      LocationOfVisitSection.config.isEnabled({
        about: aboutSectionNonVisitComplete
      })
    ).toBe(false)
  })

  it('should be enabled if about the movement is complete and it is a visit', () => {
    expect(
      LocationOfVisitSection.config.isEnabled({
        about: aboutSectionVisitComplete
      })
    ).toBe(true)
  })

  it('should not be visible if about the movement is not complete', () => {
    expect(LocationOfVisitSection.config.isVisible({})).toBe(false)
  })

  it('should not be visible if about the movement is complete and it is not a visit', () => {
    expect(
      LocationOfVisitSection.config.isVisible({
        about: aboutSectionNonVisitComplete
      })
    ).toBe(false)
  })

  it('should be visible if about the movement is complete and it is a visit', () => {
    expect(
      LocationOfVisitSection.config.isVisible({
        about: aboutSectionVisitComplete
      })
    ).toBe(true)
  })
})
