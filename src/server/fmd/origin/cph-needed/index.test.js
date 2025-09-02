import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { CphNeededExitPage } from './index.js'

const pageUrl = '/fmd/movement-origin/animal-location/cph-needed'

describe('#OriginExitPage', () => {
  it('should have the correct properties', () => {
    const page = new CphNeededExitPage()
    expect(page.pageTitle).toBe(
      'You need a cph number to continue your application'
    )
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/origin/cph-needed/index')
  })

  describePageSnapshot({
    describes: 'OriginExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
