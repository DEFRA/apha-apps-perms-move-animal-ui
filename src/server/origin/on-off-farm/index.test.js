import { onOffFarm, onOffFarmPage, OnOffFarmPage } from './index.js'
import { OnOffFarmAnswer } from '../../common/model/answer/on-off-farm/on-off-farm.js'
import { exitPage } from '../exit-page/index.js'
import { originTypePage } from '../origin-type/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'origin'
const question = 'Are you moving the animals on or off your farm or premises?'
const questionKey = 'onOffFarm'
const view = 'origin/on-off-farm/index'
const pageUrl = '/origin/to-or-from-own-premises'

describe('OnOffFarmPage', () => {
  let page

  beforeEach(() => {
    page = new OnOffFarmPage()
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
    expect(page.Answer).toBe(OnOffFarmAnswer)
  })

  it('nextPage should return exitPage when answer is "on"', () => {
    const answer = { value: 'on' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(exitPage)
  })

  it('nextPage should return originTypePage when answer is "off"', () => {
    const answer = { value: 'off' }
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(originTypePage)
  })

  it('should export page', () => {
    expect(onOffFarmPage).toBeInstanceOf(OnOffFarmPage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(onOffFarm).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      onOffFarm.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describe('#onOffFarmPage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
