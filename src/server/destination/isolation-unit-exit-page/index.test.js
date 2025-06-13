import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { IsolationUnitExitPage } from './index.js'

const pageUrl = '/destination/tb-isolation-unit'

describe('#IsolationUnitExitPage', () => {
  it('should have the correct properties', () => {
    const page = new IsolationUnitExitPage()
    expect(page.pageTitle).toBe(
      'This service is not available for your movement type'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('destination/isolation-unit-exit-page/index')
  })

  describePageSnapshot({
    describes: 'IsolationUnitExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
