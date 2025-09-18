import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, milkWhoIsMovingPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MilkAnimalPage } from '../milk-animal/index.js'

const sectionKey = 'about'
const questionKey = 'milkWhoIsMoving'
const pageUrl = '/fmd/about-the-movement-or-activity/producer'
const page = milkWhoIsMovingPage
const question = 'Who is moving the milk?'

const payload = {
  [questionKey]: 'producer'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right validation', () => {
    expect(Answer.config.validation).toEqual({
      empty: 'Select who is moving the milk'
    })
  })
})

describe('MilkWhoIsMovingPage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return MilkAnimalPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MilkAnimalPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
