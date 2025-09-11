import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, differentCompanyTransportingMilkPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CompanyTransportingMilkPage } from '../company-transporting-milk/index.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'destination'
const questionKey = 'differentCompanyTransportingMilk'
const pageUrl =
  '/fmd/movement-destination/different-transporting-company-yes-no'
const page = differentCompanyTransportingMilkPage
const question = 'Will a different company be transporting the milk?'

const payload = {
  [questionKey]: 'yes'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the correct validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if a different company will be transporting the milk'
    )
  })
})

describe('DifferentCompanyTransportingMilkPage', () => {
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
    it.each([
      ['yes', CompanyTransportingMilkPage],
      ['no', CheckAnswersPage]
    ])('for %s should return %s', (value, expectedPage) => {
      const answer = new Answer({ [questionKey]: value })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
