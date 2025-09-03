import { checkAnswersPage } from './check-answers/index.js'
import { MockMovementDetailsPage } from './mock-page/index.js'
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
    expect(MovementDetailsSection.firstPageFactory()).toBeInstanceOf(
      MockMovementDetailsPage
    )
  })

  it('should not be visible', () => {
    expect(MovementDetailsSection.config.isVisible({})).toBe(false)
  })

  it('should not be enabled', () => {
    expect(MovementDetailsSection.config.isEnabled({})).toBe(false)
  })
})
