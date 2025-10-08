import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { originTypeOtherPage, OriginTypeOtherPage } from './index.js'
import { originFarmCphPage } from '../origin-farm-cph/index.js'
import { OriginTypeOtherAnswer } from '../../../common/model/answer/origin-type-other/origin-type-other.js'
import { cphNumberPage } from '../cph-number/index.js'

const sectionKey = 'origin'
const question =
  'What type of premises with TB restrictions are the animals moving off?'
const questionKey = 'originTypeOther'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/type-of-origin-other'

describe('OriginTypeOtherPage', () => {
  const page = new OriginTypeOtherPage()

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
    expect(page.Answer).toBe(OriginTypeOtherAnswer)
  })

  it('nextPage should return destination originFarmCphPage', () => {
    const nextPage = page.nextPage(null, {
      origin: {
        onOffFarm: 'on'
      }
    })
    expect(nextPage).toBe(originFarmCphPage)
  })

  it('nextPage should return destination cphNumberPage when moving off the farm', () => {
    const nextPage = page.nextPage(null, {
      origin: {
        onOffFarm: 'off'
      }
    })
    expect(nextPage).toBe(cphNumberPage)
  })

  it('should export page', () => {
    expect(originTypeOtherPage).toBeInstanceOf(OriginTypeOtherPage)
  })

  describePageSnapshot({
    describes: 'RestockAdditionalInfoPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
