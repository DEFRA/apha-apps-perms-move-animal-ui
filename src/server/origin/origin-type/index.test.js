import { originType, originTypePage, OriginTypePage } from './index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { cphNumberPage } from '../cph-number/index.js'
import { exitPagePremisesType } from '../premises-type-exit-page/index.js'

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */

const sectionKey = 'origin'
const question = 'What type of premises are the animals moving off?'
const questionKey = 'originType'
const view = 'origin/origin-type/index'
const pageUrl = '/origin/type-of-origin'

describe('OriginTypePage', () => {
  let page

  beforeEach(() => {
    page = new OriginTypePage()
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
    expect(page.Answer).toBe(OriginTypeAnswer)
  })

  it('should export page', () => {
    expect(originTypePage).toBeInstanceOf(OriginTypePage)
  })

  it('nextPage should return cphNumberPage when answer is "tb-restricted-farm"', () => {
    const answer = { value: 'tb-restricted-farm' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(cphNumberPage)
  })

  it('nextPage should return cphNumberPage when answer is "afu"', () => {
    const answer = { value: 'afu' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(cphNumberPage)
  })

  it('nextPage should return exitPagePremisesType when answer is "other"', () => {
    const answer = { value: 'other' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(exitPagePremisesType)
  })

  it('should export originType as a plugin', () => {
    expect(originType).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      originType.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })
})
