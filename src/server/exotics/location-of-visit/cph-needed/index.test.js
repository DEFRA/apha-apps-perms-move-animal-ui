import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { CphNeededExitPage } from './index.js'

const pageUrl = '/exotics/location-of-visit/cph-needed'

describe('#LocationOfVisitExitPage', () => {
  it('should have the correct properties', () => {
    const page = new CphNeededExitPage()
    expect(page.pageTitle).toBe(
      'You need a cph number to continue your application'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('exotics/location-of-visit/cph-needed/index')
  })

  describePageSnapshot({
    describes: 'LocationOfVisitExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
