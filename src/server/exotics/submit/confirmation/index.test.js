import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { exoticsConfirmationPage } from './index.js'

const pageTitle = 'Your animal disease movement licence application'

describe('ExoticsConfirmationPage', () => {
  const page = exoticsConfirmationPage

  it('should have the right key', () => {
    expect(page.key).toBe('exotics-submit-confirmation')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/exotics/submit/confirmation')
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe(pageTitle)
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe(pageTitle)
  })

  describePageSnapshot({
    describes: 'ExoticsConfirmationPage',
    it: 'should have the expected content',
    pageUrl: page.urlPath
  })
})
