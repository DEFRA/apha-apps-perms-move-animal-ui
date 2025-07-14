import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { SizeErrorPage } from './index.js'

const sectionKey = 'biosecurity-map'
const key = 'size-error'
const pageTitle = 'There was a problem uploading your biosecurity map'
const view = 'tb/biosecurity-map/size-error/index'
const pageUrl = '/tb/biosecurity-map/size-error'

describe('#SizeErrorPage', () => {
  let page

  beforeEach(() => {
    page = new SizeErrorPage()
  })

  it('should have correct url path', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct key', () => {
    expect(page.key).toBe(key)
  })

  it('should have the correct title', () => {
    expect(page.pageTitle).toBe(pageTitle)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  describePageSnapshot({
    describes: 'SizeErrorPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
