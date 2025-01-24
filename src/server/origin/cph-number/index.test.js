import { cphNumber, cphNumberPage, CphNumberPage } from './index.js'
import { CphNumberAnswer } from '../../common/model/answer/cph-number/cph-number.js'
import { originAddressPage } from '../address/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'origin'
const question =
  'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?'
const questionKey = 'cphNumber'
const view = 'origin/cph-number/index'
const pageUrl = '/origin/cph-number'

describe('CphNumberPage', () => {
  let page

  beforeEach(() => {
    page = new CphNumberPage()
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
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(originAddressPage)
  })

  it('should export page', () => {
    expect(cphNumberPage).toBeInstanceOf(CphNumberPage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(cphNumber).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      cphNumber.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describe('#cphNumberPage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
