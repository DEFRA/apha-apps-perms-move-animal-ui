import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { LicenceNotNeededExitPage } from './index.js'

const pageUrl = '/fmd/about-the-movement-or-activity/licence-not-needed'

describe('#AboutExitPage', () => {
  it('should have the correct properties', () => {
    const page = new LicenceNotNeededExitPage()
    expect(page.pageTitle).toBe(
      'You do not need to apply for a licence to move milk'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/about/licence-not-needed/index')
  })

  describePageSnapshot({
    describes: 'AboutExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
