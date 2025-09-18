import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, driverPhonePage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { CollectionPremisesPage } from '../collection-premises/index.js'

const sectionKey = 'movement'
const questionKey = 'driverPhone'
const pageUrl = '/fmd/movement-details/driver-phone-number'
const page = driverPhonePage
const question = "What is the vehicle driver's phone number?"

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

  it('should have the right validation empty message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      "Enter the vehicle driver's phone number"
    )
  })

  it('should have the right validation for max length', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(100)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })

})

describe('DriverPhonePage', () => {
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
    it('should return CollectionPremisesPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CollectionPremisesPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
