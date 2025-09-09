import {
  aboutSectionCompleteOtherMovement,
  aboutSectionCompleteSlaughter
} from '../../common/test-helpers/fmd/journey-state.js'
import { AbattoirNamePage } from './abattoir-name/index.js'
import { CarcassesDestinationTypePage } from './carcasses-destination-type/index.js'
import { checkAnswersPage } from './check-answers/index.js'
import { CompanySellingMilkToPage } from './company-selling-milk-to/index.js'
import { DestinationSection } from './section.js'
import { WillMoveToTlaPage } from './will-move-to-tla/index.js'

describe('DestinationSection', () => {
  it('should have the correct configuration', () => {
    expect(DestinationSection.config.key).toBe('destination')
    expect(DestinationSection.config.title).toBe('Movement destination')
  })

  it('should have the right check answers page link', () => {
    expect(DestinationSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page for carcasses', () => {
    expect(
      DestinationSection.firstPageFactory({
        about: {
          ...aboutSectionCompleteOtherMovement,
          whatIsMoving: 'carcasses'
        }
      })
    ).toBeInstanceOf(CarcassesDestinationTypePage)
  })

  it('should have the correct first page for live animals to slaughter', () => {
    expect(
      DestinationSection.firstPageFactory({
        about: {
          ...aboutSectionCompleteOtherMovement,
          moveToSlaughter: 'yes'
        }
      })
    ).toBeInstanceOf(AbattoirNamePage)
  })

  it('should have the correct first page for live animals NOT to slaughter', () => {
    expect(
      DestinationSection.firstPageFactory({
        about: aboutSectionCompleteOtherMovement
      })
    ).toBeInstanceOf(WillMoveToTlaPage)
  })

  it('should have the correct first page for milk', () => {
    expect(
      DestinationSection.firstPageFactory({
        about: {
          ...aboutSectionCompleteOtherMovement,
          whatIsMoving: 'milk'
        }
      })
    ).toBeInstanceOf(CompanySellingMilkToPage)
  })

  it('should only be visible and enabled when not "slaughter on site"', () => {
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

    expect(DestinationSection.config.isEnabled(contextSlaughterOnSite)).toBe(
      false
    )
    expect(DestinationSection.config.isVisible(contextSlaughterOnSite)).toBe(
      false
    )

    expect(DestinationSection.config.isEnabled(contextOtherMovement)).toBe(true)
    expect(DestinationSection.config.isVisible(contextOtherMovement)).toBe(true)
  })
})
