import { address, originAddressPage, OriginAddressPage } from './index.js'
import { originSummaryPage } from '~/src/server/origin/summary/index.js'
import { AddressAnswer } from '../../common/model/answer/address/address.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'origin'
const question =
  'What is the address of your farm or premises where the animals are moving off?'
const questionKey = 'address'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/address'

describe('OriginAddressPage', () => {
  let page

  beforeEach(() => {
    page = new OriginAddressPage()
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
    expect(page.Answer).toBe(AddressAnswer)
  })

  it('nextPage should return summaryPage', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(originSummaryPage)
  })

  it('should export page', () => {
    expect(originAddressPage).toBeInstanceOf(OriginAddressPage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(address).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      address.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describe('#originAddressPage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
