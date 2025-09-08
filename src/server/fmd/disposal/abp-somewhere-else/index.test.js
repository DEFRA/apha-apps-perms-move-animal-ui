import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { AbpSomewhereElseExitPage } from './index.js'

const pageUrl = '/fmd/disposal-of-animals/ABP-somewhere-else'

describe('#DisposalExitPage', () => {
  it('should have the correct properties', () => {
    const page = new AbpSomewhereElseExitPage()
    expect(page.pageTitle).toBe(
      'You must dispose of animal by products at certain locations'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/disposal/abp-somewhere-else/index')
  })

  describePageSnapshot({
    describes: 'DisposalExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
