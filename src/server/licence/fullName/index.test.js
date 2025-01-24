import { fullName, fullNamePage, FullNamePage } from './index.js'
import { FullNameAnswer } from '../../common/model/answer/fullName/fullName.js'

import { receiveMethodPage } from '../receiveMethod/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'licence'
const question = 'What is the name of the County Parish Holding (CPH) owner?'
const questionKey = 'fullName'
const view = 'licence/fullName/index'
const pageUrl = '/receiving-the-licence/licence-name'

describe('FullNamePage', () => {
  let page

  beforeEach(() => {
    page = new FullNamePage()
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
    expect(page.Answer).toBe(FullNameAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(receiveMethodPage)
  })

  it('should export page', () => {
    expect(fullNamePage).toBeInstanceOf(FullNamePage)
  })

  it('should export FullName as a plugin', () => {
    expect(fullName).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      fullName.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'FullNamePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
