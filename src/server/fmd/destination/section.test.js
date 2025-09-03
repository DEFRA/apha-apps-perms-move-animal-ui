import { checkAnswersPage } from './check-answers/index.js'
import { MockDestinationPage } from './mock-page/index.js'
import { DestinationSection } from './section.js'

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
      MockDestinationPage
    )
  })

  it('should not be visible', () => {
    expect(DestinationSection.config.isVisible({})).toBe(false)
  })

  it('should not be enabled', () => {
    expect(DestinationSection.config.isEnabled({})).toBe(false)
  })
})
