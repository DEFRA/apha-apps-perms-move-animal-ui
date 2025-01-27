import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { AnotherDestinationExitPage } from './index.js'

const sectionKey = 'destination'
const view = 'destination/another-destination/index'
const pageUrl = '/destination/can-not-use-service'

describe('#AnotherDestinationExitPage', () => {
  let page

  beforeEach(() => {
    page = new AnotherDestinationExitPage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  describePageSnapshot({
    describes: 'AnotherDestinationPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
