import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '../../common/test-helpers/exotic/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { KeeperNamePage } from './keeper-name/index.js'
import { OriginResponsiblePersonNamePage } from './origin-responsible-person-name/index.js'
import { LicenceSection } from './section.js'
import { VisitResponsiblePersonNamePage } from './visit-responsible-person-name/index.js'

describe('LicenceSection', () => {
  it('should have the correct configuration', () => {
    expect(LicenceSection.config.key).toBe('licence')
    expect(LicenceSection.config.title).toBe('Receiving the licence')
  })

  it('should have the right check answers page link', () => {
    expect(LicenceSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page when the application is a visit', () => {
    expect(
      LicenceSection.firstPageFactory({
        about: aboutSectionVisitComplete
      })
    ).toBeInstanceOf(VisitResponsiblePersonNamePage)
  })

  it.each([
    ['carcasses'],
    ['animal-by-products-and-waste'],
    ['equipment'],
    ['bedding-and-feed'],
    ['other']
  ])('should have the correct first page for products: %s', (product) => {
    expect(
      LicenceSection.firstPageFactory({
        about: {
          ...aboutSectionNonVisitComplete,
          whatIsMoving: product
        }
      })
    ).toBeInstanceOf(OriginResponsiblePersonNamePage)
  })

  it('should have the correct first page for live animals', () => {
    expect(
      LicenceSection.firstPageFactory({
        about: {
          ...aboutSectionNonVisitComplete,
          whatIsMoving: 'live-animals'
        }
      })
    ).toBeInstanceOf(KeeperNamePage)
  })

  it('should not be enabled if about the movement is not complete', () => {
    expect(LicenceSection.config.isEnabled({})).toBe(false)
  })

  it('should be enabled if about the movement is complete', () => {
    expect(
      LicenceSection.config.isEnabled({
        about: aboutSectionVisitComplete
      })
    ).toBe(true)
  })
})
