import { LastGrazedAnswer } from '../../common/model/answer/last-grazed/last-grazed.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { manureAndSlurryPage } from '../manure-and-slurry/index.js'
import { lastGrazed, lastGrazedPage, LastGrazedPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'How long ago was the field last grazed by cattle?'
const questionKey = 'lastGrazed'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/last-grazed'

describe('LastGrazedPage', () => {
  const page = new LastGrazedPage()

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(LastGrazedAnswer)
  })

  it('nextPage should return manure and slurry page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(manureAndSlurryPage)
  })

  it('should export page', () => {
    expect(lastGrazedPage).toBeInstanceOf(LastGrazedPage)
  })

  it('should export lastGrazed as a plugin', () => {
    expect(lastGrazed).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      lastGrazed.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'lastGrazedPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
