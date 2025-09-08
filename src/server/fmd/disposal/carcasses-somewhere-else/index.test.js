import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { CarcassesSomewhereElseExitPage } from './index.js'

const pageUrl = '/fmd/disposal-of-animals/carcasses-somewhere-else'

describe('#DisposalExitPage', () => {
  it('should have the correct properties', () => {
    const page = new CarcassesSomewhereElseExitPage()
    expect(page.pageTitle).toBe(
      'You must dispose of carcasses at certain locations'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/disposal/carcasses-somewhere-else/index')
  })

  describePageSnapshot({
    describes: 'DisposalExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
