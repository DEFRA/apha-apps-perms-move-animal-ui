import { aboutSectionComplete } from '../../common/test-helpers/fmd/journey-state.js'
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

  it('should only be enabled when "slaughter on site"', () => {
    expect(
      DisposalSection.config.isEnabled({
        about: {
          ...aboutSectionComplete,
          movementActivityType: 'slaughter-onsite'
        }
      })
    ).toBe(true)

    expect(
      DisposalSection.config.isEnabled({
        about: {
          ...aboutSectionComplete,
          movementActivityType: 'slaughter-not-onsite'
        }
      })
    ).toBe(false)
  })
})
