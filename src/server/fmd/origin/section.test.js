import {
  aboutSectionCompleteMilkProducer,
  aboutSectionCompleteSlaughter
} from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { PremisesTypePage } from './premises-type/index.js'
import { OriginSection } from './section.js'
import { TlaPage } from './tla/index.js'

describe('OriginSection', () => {
  it('should have the correct configuration', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
  })

  it('should have the right check answers page link', () => {
    expect(OriginSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it.each([
    ['milk', PremisesTypePage],
    ['not-milk', TlaPage]
  ])('should have the correct start page', (value, expectedPage) => {
    expect(
      OriginSection.firstPageFactory({
        about: {
          whatIsMoving: value
        }
      })
    ).toBeInstanceOf(expectedPage)
  })

  it('should not be visible when about section is incomplete', () => {
    expect(OriginSection.config.isVisible({})).toBe(false)
  })

  it('should not be enabled when about section is incomplete', () => {
    expect(OriginSection.config.isEnabled({})).toBe(false)
  })

  it('should be visible and enabled when about section is complete and not moving milk', () => {
    expect(
      OriginSection.config.isVisible({
        about: aboutSectionCompleteSlaughter
      })
    ).toBe(true)
    expect(
      OriginSection.config.isEnabled({
        about: aboutSectionCompleteSlaughter
      })
    ).toBe(true)
  })

  it('should be visible and enabled when about section is complete and it is a producer moving milk', () => {
    expect(
      OriginSection.config.isVisible({
        about: aboutSectionCompleteMilkProducer
      })
    ).toBe(true)
    expect(
      OriginSection.config.isEnabled({
        about: aboutSectionCompleteMilkProducer
      })
    ).toBe(true)
  })

  it('should NOT be visible nor enabled when about section is complete and it is a producer moving milk', () => {
    const context = {
      about: {
        ...aboutSectionCompleteMilkProducer,
        milkWhoIsMoving: 'dairy'
      }
    }
    expect(OriginSection.config.isVisible(context)).toBe(false)
    expect(OriginSection.config.isEnabled(context)).toBe(false)
  })
})
