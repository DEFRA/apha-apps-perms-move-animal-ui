import { aboutSectionComplete } from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { OriginResponsiblePersonNamePage } from './origin-responsible-person-name/index.js'
import { RegisteredKeeperNamePage } from './registered-keeper-name/index.js'
import { LicenceSection } from './section.js'

describe('LicenceSection', () => {
  it('should have the correct configuration', () => {
    expect(LicenceSection.config.key).toBe('licence')
    expect(LicenceSection.config.title).toBe('Receiving the licence')
  })

  it('should have the right check answers page link', () => {
    expect(LicenceSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page for milk', () => {
    expect(
      LicenceSection.firstPageFactory({
        about: {
          ...aboutSectionComplete,
          whatIsMoving: 'milk'
        }
      })
    ).toBeInstanceOf(OriginResponsiblePersonNamePage)
  })

  it('should have the correct first page for anything other than milk', () => {
    expect(
      LicenceSection.firstPageFactory({
        about: {
          ...aboutSectionComplete,
          whatIsMoving: 'something-else'
        }
      })
    ).toBeInstanceOf(RegisteredKeeperNamePage)
  })

  it('should be visible', () => {
    expect(LicenceSection.config.isVisible({})).toBe(true)
  })

  it('should not be enabled if about the movement is not complete', () => {
    expect(LicenceSection.config.isEnabled({})).toBe(false)
  })

  it('should be enabled if about the movement is complete', () => {
    expect(
      LicenceSection.config.isEnabled({
        about: aboutSectionComplete
      })
    ).toBe(true)
  })
})
