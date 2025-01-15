import { PostExitPage } from './index.js'

const sectionKey = 'licence'
const key = 'post'
const pageTitle = 'This service does not currently send licences by post'
const view = 'licence/postExitPage/index'
const pageUrl =
  '/receiving-the-licence/licence-select-post-can-not-use-this-service'
const continueButtonText = 'Continue with email'
const continueButtonClasses = 'govuk-button--secondary'

describe('#PostExitPage', () => {
  let page

  beforeEach(() => {
    page = new PostExitPage()
  })

  it('should have correct url path', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct key', () => {
    expect(page.key).toBe(key)
  })

  it('should have the correct title', () => {
    expect(page.pageTitle).toBe(pageTitle)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should return the correct view props', () => {
    expect(page.viewProps().continueButtonText).toBe(continueButtonText)
    expect(page.viewProps().continueButtonClasses).toBe(continueButtonClasses)
  })
})
