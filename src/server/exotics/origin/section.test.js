import { aboutSectionNonVisitComplete } from '../../common/test-helpers/exotic/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { OriginSection } from './section.js'
import { TypeOfAnimalLocationPage } from './type-of-animal-location/index.js'
import { TypeOfProductLocationPage } from './type-of-product-location/index.js'

const validAboutState = aboutSectionNonVisitComplete

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

  it('should returned as enabled when the movement type is not visit', () => {
    const state = {
      about: {
        ...validAboutState
      }
    }
    expect(OriginSection.config.isEnabled(state)).toBe(true)
  })

  it('should not be enabled when the movement type is visit', () => {
    const state = {
      about: {
        ...validAboutState,
        movementType: 'visit'
      }
    }
    expect(OriginSection.config.isEnabled(state)).toBe(false)
  })

  it('should be visible when the about section is valid and movement type is not visit', () => {
    const state = {
      about: {
        ...validAboutState
      }
    }
    expect(OriginSection.config.isVisible(state)).toBe(true)
  })

  it('should not be visible when the about section is invalid or movement type is visit', () => {
    const state = {
      about: {
        ...validAboutState,
        movementType: 'visit'
      }
    }

    expect(OriginSection.config.isVisible(state)).toBe(false)
  })
})
