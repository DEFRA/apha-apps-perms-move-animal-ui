import {
  aboutSectionCompleteOtherMovement,
  aboutSectionCompleteSlaughter
} from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { DisposalWholeAnimalPage } from './disposal-whole-animal/index.js'
import { DisposalSection } from './section.js'

describe('DisposalSection', () => {
  it('should have the correct configuration', () => {
    expect(DisposalSection.config.key).toBe('disposal')
    expect(DisposalSection.config.title).toBe('Disposal of the animal')
  })

  it('should have the right check answers page link', () => {
    expect(DisposalSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page', () => {
    expect(DisposalSection.firstPageFactory()).toBeInstanceOf(
      DisposalWholeAnimalPage
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

    expect(DisposalSection.config.isEnabled(contextSlaughterOnSite)).toBe(true)
    expect(DisposalSection.config.isVisible(contextSlaughterOnSite)).toBe(true)

    expect(DisposalSection.config.isEnabled(contextOtherMovement)).toBe(false)
    expect(DisposalSection.config.isVisible(contextOtherMovement)).toBe(false)
  })
})
