import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { DestinationExitPage } from './index.js'

const pageUrl = '/fmd/movement-destination/can-not-use-service'

describe('#DestinationExitPage', () => {
  it('should have the correct properties', () => {
    const page = new DestinationExitPage()
    expect(page.pageTitle).toBe(
      'You cannot apply for a licence for this movement'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/destination/destination-exit-page/index')
  })

  describePageSnapshot({
    describes: 'DestinationExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
