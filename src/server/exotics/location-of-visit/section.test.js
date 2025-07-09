import { checkAnswersPage } from './check-answers/index.js'
import { LocationOfVisitPage } from './type-of-location/index.js'
import { LocationOfVisitSection } from './section.js'

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
    // TEMPLATE -TODO: update test to check start page factory
    expect(LocationOfVisitSection.firstPageFactory()).toBeInstanceOf(
      LocationOfVisitPage
    )
  })
})
