import { originFarmCphPage, OriginFarmCphPage } from './index.js'
import { CphNumberAnswer } from '../../../common/model/answer/cph-number/cph-number.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { cphNumberPage } from '../cph-number/index.js'
import { originFarmAddressPage } from '../origin-farm-address/index.js'

const sectionKey = 'origin'
const question =
  'What is the county parish holding (CPH) number of the farm or premises where the animals are moving off?'
const questionKey = 'cphNumber'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/origin-farm-cph'

describe('OriginFarmCph', () => {
  let page

  beforeEach(() => {
    page = new OriginFarmCphPage()
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

  it('should share a question key with CphNumberPage, since they control the sae data', () => {
    expect(page.sectionKey).toBe(cphNumberPage.sectionKey)
    expect(page.questionKey).toBe(cphNumberPage.questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(originFarmAddressPage)
  })

  it('should export page', () => {
    expect(originFarmCphPage).toBeInstanceOf(OriginFarmCphPage)
  })
})

describePageSnapshot({
  describes: '#OriginFarmCph.content',
  it: 'should render expected response and content',
  pageUrl
})
