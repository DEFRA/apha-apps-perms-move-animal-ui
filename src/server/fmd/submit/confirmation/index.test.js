import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { fmdConfirmationPage } from './index.js'

const pageTitle = 'Your animal disease movement licence application'

describe('FmdConfirmationPage', () => {
  const page = fmdConfirmationPage

  it('should have the right key', () => {
    expect(page.key).toBe('fmd-submit-confirmation')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/fmd/submit/confirmation')
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe(pageTitle)
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe(pageTitle)
  })

  describePageSnapshot({
    describes: 'FmdConfirmationPage',
    it: 'should have the expected content',
    pageUrl: page.urlPath,
    state: {
      raw: {
        'fmd-confirmation-details': {
          reference: 'EX-EXAM-PLE!',
          'state-key': 'application'
        }
      }
    }
  })
})
