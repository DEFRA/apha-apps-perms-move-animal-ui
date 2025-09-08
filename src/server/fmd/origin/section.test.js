import { aboutSectionComplete } from '../../common/test-helpers/fmd/journey-state.js'
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

  it('should be visible', () => {
    expect(OriginSection.config.isVisible({})).toBe(true)
  })

  it('should not be enabled when about section is incomplete', () => {
    expect(OriginSection.config.isEnabled({})).toBe(false)
  })

  it('should be enabled when about section is complete', () => {
    expect(
      OriginSection.config.isEnabled({
        about: aboutSectionComplete
      })
    ).toBe(true)
  })
})
