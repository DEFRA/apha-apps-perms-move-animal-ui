import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '../../common/test-helpers/exotic/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { DestinationSection } from './section.js'
import { TypeOfLocationPage } from './type-of-location/index.js'

describe('DestinationSection', () => {
  it('should have the correct configuration', () => {
    expect(DestinationSection.config.key).toBe('destination')
    expect(DestinationSection.config.title).toBe('Movement destination')
  })

  it('should have the right check answers page link', () => {
    expect(DestinationSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page', () => {
    expect(DestinationSection.firstPageFactory()).toBeInstanceOf(
      TypeOfLocationPage
    )
  })

  it('should returned as enabled when the movement type is not visit', () => {
    const state = {
      about: aboutSectionNonVisitComplete
    }
    expect(DestinationSection.config.isEnabled(state)).toBe(true)
  })

  it('should not be enabled when the movement type is visit', () => {
    const state = {
      about: aboutSectionVisitComplete
    }
    expect(DestinationSection.config.isEnabled(state)).toBe(false)
  })

  it('should be visible when the about section is valid and movement type is not visit', () => {
    const state = {
      about: aboutSectionNonVisitComplete
    }
    expect(DestinationSection.config.isVisible(state)).toBe(true)
  })

  it('should not be visible when the about section is invalid or movement type is visit', () => {
    const state = {
      about: aboutSectionVisitComplete
    }

    expect(DestinationSection.config.isVisible(state)).toBe(false)
  })
})
