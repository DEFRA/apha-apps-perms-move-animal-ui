import {
  IdentificationWarningPage,
  IdentificationWarningController,
  identificationWarningPage
} from './index.js'

describe('IdentificationWarningPage', () => {
  let page

  beforeEach(() => {
    page = new IdentificationWarningPage()
  })

  test('should have the correct page title', () => {
    expect(page.pageTitle).toBe('Your application might be unsuccessful')
  })

  test('should have the correct section key', () => {
    expect(page.sectionKey).toBe('identification')
  })

  test('should have the correct URL path', () => {
    expect(page.urlPath).toBe('/identification/warning')
  })

  test('should be an interstitial page', () => {
    expect(page.isInterstitial).toBe(true)
  })

  test('should have the correct view', () => {
    expect(page.view).toBe('identification/warning/index')
  })

  test('should return the correct next page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBeDefined()
    expect(nextPage.urlPath).toBe('/identification/enter-ear-tags-calves')
  })

  test('should return the correct view properties', () => {
    const viewProps = page.viewProps()
    expect(viewProps).toEqual({
      nextPage: '/identification/enter-ear-tags-calves'
    })
  })
})

describe('IdentificationWarningController', () => {
  let controller

  beforeEach(() => {
    controller = new IdentificationWarningController(identificationWarningPage)
  })

  test('should have the correct plugin name', () => {
    expect(controller.pluginName).toBe('identification-warning')
  })

  test('should be instantiated with the correct page', () => {
    expect(controller.page).toBe(identificationWarningPage)
  })
})
