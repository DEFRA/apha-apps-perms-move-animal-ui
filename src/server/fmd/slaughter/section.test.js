import { aboutSectionComplete } from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { SlaughterInformationSection } from './section.js'
import { SlaughterOrKnackermanPage } from './slaughter-or-knackerman/index.js'

describe('SlaughterInformationSection', () => {
  it('should have the correct configuration', () => {
    expect(SlaughterInformationSection.config.key).toBe('slaughter')
    expect(SlaughterInformationSection.config.title).toBe(
      'Slaughter information'
    )
  })

  it('should have the right check answers page link', () => {
    expect(SlaughterInformationSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it('should have the correct first page', () => {
    expect(SlaughterInformationSection.firstPageFactory()).toBeInstanceOf(
      SlaughterOrKnackermanPage
    )
  })

  it('should only be enabled when "slaughter on site"', () => {
    expect(
      SlaughterInformationSection.config.isEnabled({
        about: aboutSectionComplete
      })
    ).toBe(true)

    expect(
      SlaughterInformationSection.config.isEnabled({
        about: {
          ...aboutSectionComplete,
          movementActivityType: 'slaughter-not-onsite'
        }
      })
    ).toBe(false)
  })
})
