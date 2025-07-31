import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { AboutMovementExitPage } from './index.js'

const pageUrl = '/exotics/about-the-movement/can-not-use-service'

describe('#AboutMovementExitPage', () => {
  it('should have the correct properties', () => {
    const page = new AboutMovementExitPage()
    expect(page.pageTitle).toBe(
      'You cannot apply for a licence for this movement'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('exotics/about/about-movement-exit-page/index')
  })

  describePageSnapshot({
    describes: 'AboutMovementExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
