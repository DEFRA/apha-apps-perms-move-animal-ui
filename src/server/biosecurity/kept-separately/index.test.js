import { KeptSeparatelyAnswer } from '../../common/model/answer/kept-separately/kept-separately.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { disinfectionPage } from '../disinfection/index.js'
import { grazingPage } from '../grazing/index.js'
import {
  keptSeparately,
  keptSeparatelyPage,
  KeptSeparatelyPage
} from './index.js'

const sectionKey = 'biosecurity'
const question = 'Will you separate the incoming cattle from the resident herd?'
const questionKey = 'keptSeparately'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/kept-separately'

describe('KeptSeparatelyPage', () => {
  let page

  beforeEach(() => {
    page = new KeptSeparatelyPage()
  })

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
    expect(page.Answer).toBe(KeptSeparatelyAnswer)
  })

  it('nextPage should return grazing when answer is "yes"', () => {
    const answer = { value: 'yes' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(grazingPage)
  })

  it('nextPage should return disinfection page when answer is "no"', () => {
    const answer = { value: 'no' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(disinfectionPage)
  })

  it('should export page', () => {
    expect(keptSeparatelyPage).toBeInstanceOf(KeptSeparatelyPage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(keptSeparately).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      keptSeparately.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'keptSeparatelyPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
