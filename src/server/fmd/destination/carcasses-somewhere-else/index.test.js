import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { CarcassesSomewhereElseExitPage } from './index.js'

const pageUrl = '/fmd/movement-destination/somewhere-else'

describe('#DestinationExitPage', () => {
  it('should have the correct properties', () => {
    const page = new CarcassesSomewhereElseExitPage()
    expect(page.pageTitle).toBe(
      'Carcasses must be disposed of at certain locations'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/destination/carcasses-somewhere-else/index')
  })

  describePageSnapshot({
    describes: 'DestinationExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
