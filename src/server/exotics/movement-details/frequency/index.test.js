import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, frequencyPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MaximumNumberOfJourneysPage } from '../maximum-number-of-journeys/index.js'

const sectionKey = 'movementDetails'
const questionKey = 'frequency'
const pageUrl = '/exotics/movement-details/frequency'
const page = frequencyPage
const question = 'How frequent is the movement?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the frequency of the movement'
    )
  })
})

describe('FrequencyPage', () => {
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
      ['regular', MaximumNumberOfJourneysPage],
      ['one-off', MaximumNumberOfJourneysPage]
    ])('for %s should return %s', (value, expectedPage) => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
