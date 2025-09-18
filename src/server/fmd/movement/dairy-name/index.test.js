import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, dairyNamePage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { VehicleNumberPage } from '../vehicle-number/index.js'

const sectionKey = 'movement'
const questionKey = 'dairyName'
const pageUrl = '/fmd/movement-details/dairy-name'
const page = dairyNamePage
const question = 'What is the name of the dairy collecting the milk?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right empty validation message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the name of the dairy'
    )
  })

  it('should have the right max length validation message', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(100)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('DairyNamePage', () => {
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
    it('should return VehicleNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(VehicleNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
