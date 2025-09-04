import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { MovementOnExitPage } from './index.js'

const pageUrl = '/fmd/about-the-movement-or-activity/movement-on-exit-page'

describe('#AboutExitPage', () => {
  it('should have the correct properties', () => {
    const page = new MovementOnExitPage()
    expect(page.pageTitle).toBe('You can only move live animals onsite')
    expect(page.urlPath).toBe(pageUrl)
    expect(page.view).toBe('fmd/about/movement-on-exit/index')
  })

  describePageSnapshot({
    describes: 'AboutExitPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
