import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { ExitPagePremisesType } from './index.js'

const pageUrl = '/origin/can-not-use-service-premises-type'

describe('#ExitPagePremisesTypeController', () => {
  it('should have the correct properties', () => {
    const page = new ExitPagePremisesType()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('origin/premises-type-exit-page/index')
  })

  describe('#exitPremisesTypePage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})
