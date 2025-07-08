import { checkAnswersPage } from './check-answers/index.js'
import { OriginSection } from './section.js'
import { TypeOfAnimalLocationPage } from './type-of-animal-location/index.js'
import { TypeOfProductLocationPage } from './type-of-product-location/index.js'

describe('OriginSection', () => {
  it('should have the correct configuration', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
  })

  it('should have the right check answers page link', () => {
    expect(OriginSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page when moving liv animals', () => {
    expect(
      OriginSection.firstPageFactory({
        about: {
          whatIsMoving: 'live-animals'
        }
      })
    ).toBeInstanceOf(TypeOfAnimalLocationPage)
  })

  it('should have the correct first page when not moving live animals', () => {
    expect(
      OriginSection.firstPageFactory({
        about: {
          whatIsMoving: 'other'
        }
      })
    ).toBeInstanceOf(TypeOfProductLocationPage)
  })
})
