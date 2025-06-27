import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { ContactTbRestrictedFarmPage } from './index.js'

const pageUrl = '/destination/contact-the-tb-restricted-farm'

describe('ContactTbRestrictedFarmPage', () => {
  it('should have the correct properties', () => {
    const page = new ContactTbRestrictedFarmPage()
    expect(page.sectionKey).toBe('destination')
    expect(page.pageTitle).toBe(
      'You need to contact the TB restricted farm the animals are moving onto'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('tb/destination/contact-tb-restricted-farm/index')
  })

  describePageSnapshot({
    describes: 'ContactTbRestrictedFarmPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
