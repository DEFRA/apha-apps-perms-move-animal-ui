import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { homePage } from './index.js'

describe('HomePage', () => {
  const page = homePage

  it('should have the right key', () => {
    expect(page.key).toBe('home')
  })

  it('should have the right section key', () => {
    expect(page.sectionKey).toBe('exotics')
  })

  it('should have the right view', () => {
    expect(page.view).toBe('exotics/home/index.njk')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/exotics')
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe('Move animals under disease controls')
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe('Move animals under disease controls')
  })

  describePageSnapshot({
    describes: 'HomePage',
    it: 'should have the expected content',
    pageUrl: page.urlPath
  })
})
