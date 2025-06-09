import { RestockReasonsAnswer } from '../../common/model/answer/restock-reasons/restock-reasons.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { otherRestockReasonPage } from '../other-restock-reason/index.js'
import { RestockReasonPage, restockReasonPage } from './index.js'
import { additionalInfoPage } from '../additional-info/index.js'

const sectionKey = 'destination'
const question = 'Which reasons do you have for restocking?'
const questionKey = 'restockReasons'
const pageUrl = '/destination/restocking-additional-info-reason'

describe('RestockReasonPage', () => {
  const page = new RestockReasonPage()

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

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(RestockReasonsAnswer)
  })

  it('nextPage should return biosecurity summary page when the answer does not include "other"', () => {
    const answer = new RestockReasonsAnswer({
      restockReasons: ['fattening']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(additionalInfoPage)
  })

  it('nextPage should return other wildlife measures page when the answer includes "other"', () => {
    const answer = new RestockReasonsAnswer({
      restockReasons: ['fattening', 'other']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(otherRestockReasonPage)
  })

  it('should export page', () => {
    expect(restockReasonPage).toBeInstanceOf(RestockReasonPage)
  })

  describePageSnapshot({
    describes: 'restockReasonPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
