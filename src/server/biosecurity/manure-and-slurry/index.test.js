import { ManureAndSlurryAnswer } from '../../common/model/answer/manure-and-slurry/manure-and-slurry.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { grazingFieldHowSeparatedPage } from '../grazing-field-how-separated/index.js'
import {
  manureAndSlurry,
  manureAndSlurryPage,
  ManureAndSlurryPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Has any manure or slurry been put on the grazing field in the past 60 days?'
const questionKey = 'manureAndSlurry'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/manure-and-slurry'

describe('ManureAndSlurryPage', () => {
  const page = new ManureAndSlurryPage()

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
    expect(page.Answer).toBe(ManureAndSlurryAnswer)
  })

  it('nextPage should return grazing field how separate page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(grazingFieldHowSeparatedPage)
  })

  it('should export page', () => {
    expect(manureAndSlurryPage).toBeInstanceOf(ManureAndSlurryPage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(manureAndSlurry).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      manureAndSlurry.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'manureAndSlurryPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
