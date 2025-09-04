import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalSlaughteredPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { SlaughteredNumberPage } from '../slaughtered-number/index.js'

const sectionKey = 'about'
const questionKey = 'animalSlaughtered'
const pageUrl = '/fmd/about-the-movement-or-activity/animal-being-slaughtered'
const page = animalSlaughteredPage
const question = 'Which type of animal will be slaughtered?'

const payload = {
  [questionKey]: 'cattle'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the type of animal being slaughtered'
    )
  })
})

describe('AnimalSlaughteredPage', () => {
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
    it('should return slaughteredNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(SlaughteredNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
