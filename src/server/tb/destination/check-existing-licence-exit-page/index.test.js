import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { CheckExistingLicenceExitPage } from './index.js'

const pageUrl = '/destination/check-existing-licence'

describe('#CheckExistingLicenceExitPage', () => {
  it('should have the correct properties', () => {
    const page = new CheckExistingLicenceExitPage()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe(
      'tb/destination/check-existing-licence-exit-page/index'
    )
  })

  describePageSnapshot({
    describes: 'CheckExistingLicenceExitPage.content',
    it: 'should render expected response and content when origin is AFU',
    pageUrl,
    state: {
      application: {
        origin: {
          originType: 'afu'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'CheckExistingLicenceExitPage.content',
    it: 'should render expected response and content when destination is AFU',
    pageUrl,
    state: {
      application: {
        origin: {
          originType: 'unrestricted-farm'
        },
        destination: {
          destinationType: 'afu'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'CheckExistingLicenceExitPage.content',
    it: 'should render expected response and content when origin is not AFU',
    pageUrl,
    state: {
      application: {
        origin: {
          originType: 'slaughter'
        }
      }
    }
  })
})
