import { checkAnswersPage } from './check-answers/index.js'
import { MovementActivityTypePage } from './movement-activity-type/index.js'
import { AboutSection } from './section.js'

describe('AboutSection', () => {
  it('should have the correct configuration', () => {
    expect(AboutSection.config.key).toBe('about')
    expect(AboutSection.config.title).toBe('About the movement')
  })

  it('should have the right check answers page link', () => {
    expect(AboutSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page', () => {
    expect(AboutSection.firstPageFactory()).toBeInstanceOf(
      MovementActivityTypePage
    )
  })

  it('should be visible', () => {
    expect(AboutSection.config.isVisible({})).toBe(true)
  })

  it('should be enabled', () => {
    expect(AboutSection.config.isEnabled({})).toBe(true)
  })
})
