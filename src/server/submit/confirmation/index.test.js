import { ConfirmationPage } from './index.js'

const sectionKey = 'confirmation'
const heading = 'Your animal disease movement licence application'
const urlKey = 'submit-confirmation'
const view = 'submit/confirmation/index'
const pageUrl = '/submit/confirmation'

describe('ConfirmationPage', () => {
  let page

  beforeEach(() => {
    page = new ConfirmationPage()
  })

  it('should have correct url path', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.pageHeading).toBe(heading)
  })

  it('should have the correct questionKey', () => {
    expect(page.urlKey).toBe(urlKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })
})
