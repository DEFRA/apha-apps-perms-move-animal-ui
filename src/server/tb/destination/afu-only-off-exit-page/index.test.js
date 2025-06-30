import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { AfuOnlyOffExitPage } from './index.js'

const pageUrl = '/destination/can-not-use-service-afu-only-off'

describe('#AfuToAfuExitPage', () => {
  it('should have the correct properties', () => {
    const page = new AfuOnlyOffExitPage()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('tb/destination/afu-only-off-exit-page/index')
  })

  describePageSnapshot({
    describes: 'AfuToAfuExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
