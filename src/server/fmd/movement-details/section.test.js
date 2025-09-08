import { aboutSectionComplete } from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { MockMovementDetailsPage } from './mock-page/index.js'
import { MovementDetailsSection } from './section.js'

describe('MovementDetailsSection', () => {
  it('should have the correct configuration', () => {
    expect(MovementDetailsSection.config.key).toBe('movement')
    expect(MovementDetailsSection.config.title).toBe('Movement details')
  })

  it('should have the right check answers page link', () => {
    expect(MovementDetailsSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it.each([
    ['milk', MockMovementDetailsPage],
    ['live-animals', MockMovementDetailsPage],
    ['carcasses', MockMovementDetailsPage]
  ])(
    'should have the correct first page for %s and should return %s',
    (value, expectedPageType) => {
      expect(
        MovementDetailsSection.firstPageFactory({
          about: {
            whatIsMoving: value
          }
        })
      ).toBeInstanceOf(expectedPageType)
    }
  )

  it('should not be visible or enabled', () => {
    expect(MovementDetailsSection.config.isVisible({})).toBe(false)
  })

  it('should be visible and  enabled', () => {
    expect(
      MovementDetailsSection.config.isEnabled({
        about: aboutSectionComplete
      })
    ).toBe(true)
  })
})
