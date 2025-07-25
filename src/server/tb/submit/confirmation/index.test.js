import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { tbConfirmationPage } from './index.js'

const pageTitle = 'Your animal disease movement licence application'

describe('TbConfirmationPage', () => {
  const page = tbConfirmationPage

  it('should have the right key', () => {
    expect(page.key).toBe('tb-submit-confirmation')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/tb/submit/confirmation')
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe(pageTitle)
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe(pageTitle)
  })

  describePageSnapshot({
    describes: 'TbConfirmationPage',
    it: 'should have the expected content',
    pageUrl: page.urlPath,
    state: {
      raw: {
        'tb-applicationReference': 'TB-EXAM-PLE!'
      }
    }
  })
})
