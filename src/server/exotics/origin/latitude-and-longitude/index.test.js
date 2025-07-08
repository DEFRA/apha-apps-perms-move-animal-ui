import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, latitudeAndLongitudePage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { IsDesignatedPremisesPage } from '../is-designated-premises/index.js'

const sectionKey = 'origin'
const questionKey = 'latitudeAndLongitude'
const pageUrl = '/exotics/movement-origin/location-details'
const page = latitudeAndLongitudePage
const question =
  'What are the latitude and longitude measurements for the origin premises? '

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

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the latitude and longitude measurements'
    )
  })

  it('should define the right max lengnth input message', () => {
    expect(Answer.config.validation.maxLength).toStrictEqual({
      value: 100,
      message: 'Your answer must be no longer than 100 characters'
    })
  })
})

describe('LatitudeAndLongitudePage', () => {
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
    it('should return IsDesignatedPremisesPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(IsDesignatedPremisesPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
