import { originType, originTypePage, OriginTypePage } from './index.js'
import { OriginTypeAnswer } from '../../common/model/answer/origin-type/origin-type.js'
import { cphNumberPage } from '../cph-number/index.js'
import { exitPagePremisesType } from '../premises-type-exit-page/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { countryPage } from '../country/index.js'
import { originFarmCphPage } from '../origin-farm-cph/index.js'
import { fiftyPercentWarningPage } from '../fifty-percent-warning/index.js'

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
/** @import { OriginTypeData } from '../../common/model/answer/origin-type/origin-type.js' */

const sectionKey = 'origin'
const question = 'What type of premises are the animals moving off?'
const questionKey = 'originType'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/type-of-origin'

const page = new OriginTypePage()

describe('OriginTypePage', () => {
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

  it('should export originType as a plugin', () => {
    expect(originType).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      originType.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    describes: 'OriginTypePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

describe('#OriginPage.nextPage', () => {
  describe('Off the farm', () => {
    const context = { origin: { onOffFarm: 'off' } }

    it('should return cphNumberPage when answer is "tb-restricted-farm"', () => {
      const answer = new OriginTypeAnswer(
        { originType: 'tb-restricted-farm' },
        context
      )
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(cphNumberPage)
    })

    it('nextPage should return cphNumberPage when answer is "afu"', () => {
      const answer = new OriginTypeAnswer({ originType: 'afu' }, context)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(cphNumberPage)
    })

    it('nextPage should return exitPagePremisesType when answer is "other"', () => {
      const answer = new OriginTypeAnswer({ originType: 'other' }, context)
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(exitPagePremisesType)
    })
  })

  describe('On to the farm', () => {
    const context = { origin: { onOffFarm: 'on' } }

    const fiftyPercentOriginTypes = ['market', 'unrestricted-farm'].map((v) => [
      v
    ])

    it.each(fiftyPercentOriginTypes)(
      `should return 50% warning page for ${fiftyPercentOriginTypes.join(', ')}`,
      (originType) => {
        const answer = new OriginTypeAnswer(
          { originType: /** @type {OriginTypeData} */ (originType) },
          context
        )
        const nextPage = page.nextPage(answer, context)
        expect(nextPage).toBe(fiftyPercentWarningPage)
      }
    )

    const cphOriginTypes = [
      'tb-restricted-farm',
      'afu',
      'zoo',
      'lab',
      'other'
    ].map((v) => [v])

    it.each(cphOriginTypes)(
      `should return cphNumberPage for ${cphOriginTypes.join(', ')}`,
      (originType) => {
        const answer = new OriginTypeAnswer(
          { originType: /** @type {OriginTypeData} */ (originType) },
          context
        )
        const nextPage = page.nextPage(answer, context)
        expect(nextPage).toBe(originFarmCphPage)
      }
    )

    it('nextPage should return origin country when moving on from an import', () => {
      const answer = new OriginTypeAnswer(
        { originType: 'after-import-location' },
        context
      )
      const nextPage = page.nextPage(answer, context)
      expect(nextPage).toBe(countryPage)
    })
  })
})
