import {
  aboutSectionCompleteOtherMovement,
  aboutSectionCompleteSlaughter
} from '../../common/test-helpers/fmd/journey-state.js'
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

  it('should only be visible and enabled when "slaughter on site"', () => {
    const contextSlaughterOnSite = {
      about: {
        ...aboutSectionCompleteSlaughter,
        movementActivityType: 'slaughter-onsite'
      }
    }
    const contextOtherMovement = {
      about: {
        ...aboutSectionCompleteOtherMovement,
        movementActivityType: 'on-to-farm'
      }
    }

    expect(
      SlaughterInformationSection.config.isEnabled(contextSlaughterOnSite)
    ).toBe(true)
    expect(
      SlaughterInformationSection.config.isVisible(contextSlaughterOnSite)
    ).toBe(true)

    expect(
      SlaughterInformationSection.config.isEnabled(contextOtherMovement)
    ).toBe(false)
    expect(
      SlaughterInformationSection.config.isVisible(contextOtherMovement)
    ).toBe(false)
  })
})
