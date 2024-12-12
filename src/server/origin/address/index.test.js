import { address, originAddressPage, OriginAddressPage } from './index.js'
import { summaryPage } from '../summary/index.js'
import { Address } from '../../common/model/answer/address.js'

const sectionKey = 'origin'
const question =
  'What is the address of your farm or premises where the animals are moving off?'
const questionKey = 'address'
const view = 'origin/address/index'
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
    expect(page.Answer).toBe(Address)
  })

  it('nextPage should return summaryPage', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(summaryPage)
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
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
