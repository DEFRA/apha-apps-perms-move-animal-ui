import { earTagsCalvesPage } from '../ear-tags-calves/index.js'
import { IdentificationWarningPage } from './index.js'

describe('IdentificationWarningPage', () => {
  let page

  beforeEach(() => {
    page = new IdentificationWarningPage()
  })

  it('should have the correct page title', () => {
    expect(page.pageTitle).toBe('Your application might be unsuccessful')
  })

  it('should have the correct section key', () => {
    expect(page.sectionKey).toBe('identification')
  })

  it('should have the correct URL path', () => {
    expect(page.urlPath).toBe('/identification/warning')
  })

  it('should override redirects', () => {
    expect(page.overrideRedirects).toBe(true)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe('identification/warning/index')
  })

  it('should return the correct next page', () => {
    expect(page.nextPage()).toBe(earTagsCalvesPage)
  })

  it('should be able ot calculate the next page URL as a string for the template', () => {
    expect(page.viewProps().continueUrl).toBe(earTagsCalvesPage.urlPath)
  })
})
