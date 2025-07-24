import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, inRpaRegisteredFieldPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { LatitudeAndLongitudePage } from '../latitude-and-longitude/index.js'
import { FieldParcelNumberPage } from '../field-parcel-number/index.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'inRpaRegisteredField'
const pageUrl = '/exotics/location-of-visit/rpa-field'
const page = inRpaRegisteredFieldPage
const question = 'Will the visit be at an RPA registered field?'

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

  it('should define the right empty validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if the visit will be at an RPA registered field'
    )
  })
})

describe('InRpaRegisteredFieldPage', () => {
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
