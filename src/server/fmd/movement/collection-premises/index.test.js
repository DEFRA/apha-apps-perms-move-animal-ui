import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, collectionPremisesPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { TwoWeekRepeatPage } from '../two-week-repeat/index.js'

const sectionKey = 'movement'
const questionKey = 'collectionPremises'
const pageUrl = '/fmd/movement-details/premises-names'
const page = collectionPremisesPage
const question =
  'List the premises the vehicle will visit on the collection day'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text area input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right maxLength validation', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(5000)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })

  it('should have the right empty validation', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the premises names the vehicle will visit on collection day'
    )
  })
})

describe('CollectionPremisesPage', () => {
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
    it('should return TwoWeekRepeatPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(TwoWeekRepeatPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
