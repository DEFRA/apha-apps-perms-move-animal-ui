import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { DestinationNotSupportedPage } from './index.js'

const pageUrl = '/destination/can-not-use-service-tb16'

describe('NotSupportedMovementTypePage', () => {
  it('should have the correct properties', () => {
    const page = new DestinationNotSupportedPage()
    expect(page.sectionKey).toBe('destination')
    expect(page.pageTitle).toBe(
      'This service does not currently support this movement type'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('destination/not-supported-movement-type/index')
  })

  describePageSnapshot({
    describes: '#NotSupportedMovementTypePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
