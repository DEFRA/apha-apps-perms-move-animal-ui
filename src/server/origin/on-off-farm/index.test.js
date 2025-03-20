import { onOffFarmPage, OnOffFarmPage } from './index.js'
import { OnOffFarmAnswer } from '../../common/model/answer/on-off-farm/on-off-farm.js'
import { originTypePage } from '../origin-type/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'origin'
const question = 'Are you moving the animals on or off your farm or premises?'
const questionKey = 'onOffFarm'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/origin/to-or-from-own-premises'

const page = new OnOffFarmPage()

describe('OnOffFarmPage', () => {
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

  it('should export page', () => {
    expect(onOffFarmPage).toBeInstanceOf(OnOffFarmPage)
  })

  it('should have originTypePage as nextPage', () => {
    expect(page.nextPage()).toBe(originTypePage)
  })

  describePageSnapshot({
    describes: 'onOffFarmPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
