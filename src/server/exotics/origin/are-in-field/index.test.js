import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, areInFieldPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { FieldParcelNumberPage } from '../field-parcel-number/index.js'
import { LatitudeAndLongitudePage } from '../latitude-and-longitude/index.js'

const sectionKey = 'origin'
const questionKey = 'areInField'
const pageUrl = '/exotics/movement-origin/animals-in-field'
const page = areInFieldPage
const question = 'Are the animals you plan to move in a field?'

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
      'Select if the animals you plan to move are in a field'
    )
  })
})

describe('AreInFieldPage', () => {
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
      ['yes', FieldParcelNumberPage],
      ['no', LatitudeAndLongitudePage]
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
