import { checkAnswersPage } from './check-answers/index.js'
import { MockLicencePage } from './mock-page/index.js'
import { LicenceSection } from './section.js'

describe('LicenceSection', () => {
  it('should have the correct configuration', () => {
    expect(LicenceSection.config.key).toBe('licence')
    expect(LicenceSection.config.title).toBe('Receiving the licence')
  })

  it('should have the right check answers page link', () => {
    expect(LicenceSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page', () => {
    expect(LicenceSection.firstPageFactory()).toBeInstanceOf(MockLicencePage)
  })

  it('should be visible', () => {
    expect(LicenceSection.config.isVisible({})).toBe(false)
  })

  it('should be enabled', () => {
    expect(LicenceSection.config.isEnabled({})).toBe(false)
  })
})
