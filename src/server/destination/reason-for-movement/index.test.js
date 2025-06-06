import { reasonForMovementPage, ReasonForMovementPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { ReasonForMovementAnswer } from '../../common/model/answer/reason-for-movement/reason-for-movement.js'
import { additionalInfoPage } from '../additional-info/index.js'

const sectionKey = 'destination'
const question = 'What is the reason for the movement?'
const questionKey = 'reasonForMovement'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/reason-for-movement'

describe('ReasonForMovementPage', () => {
  let page

  beforeEach(() => {
    page = new ReasonForMovementPage()
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
    expect(page.Answer).toBe(ReasonForMovementAnswer)
  })

  it('nextPage should return additional info page when answer is any other value', () => {
    const answer = new ReasonForMovementAnswer({ reasonForMovement: 'other' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(additionalInfoPage)
  })

  it('should export page', () => {
    expect(reasonForMovementPage).toBeInstanceOf(ReasonForMovementPage)
  })

  describePageSnapshot({
    describes: 'ReasonForMovementPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
