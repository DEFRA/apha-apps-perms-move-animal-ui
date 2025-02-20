import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { OriginContactTbRestrictedFarmPage } from './index.js'

const pageUrl = '/origin/contact-the-tb-restricted-farm'

describe('ContactTbRestrictedFarmPage', () => {
  it('should have the correct properties', () => {
    const page = new OriginContactTbRestrictedFarmPage()
    expect(page.sectionKey).toBe('origin')
    expect(page.pageTitle).toBe(
      'You need to contact the TB restricted farm the animals are moving onto'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('origin/contact-tb-restricted-farm/index')
  })

  describePageSnapshot({
    describes: '#ContactTbRestrictedFarmPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
