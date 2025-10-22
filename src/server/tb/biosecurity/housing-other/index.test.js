import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, housingOtherPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { PeopleDisinfectionPage } from '../people-disinfection/index.js'

const sectionKey = 'biosecurity'
const questionKey = 'housingOther'
const pageUrl = '/biosecurity/buildings-how-minimise-contamination-other'
const page = housingOtherPage
const question =
  'What other measures are being taken to reduce the spread of TB during housing?'

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

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  it('should have 4 rows', () => {
    expect(Answer.config.rows).toBe(4)
  })

  describe('validation', () => {
    it('should have empty validation message', () => {
      expect(Answer.config.validation.empty?.message).toBe(
        'Enter details on the other measures being taken to reduce the spread of TB during housing'
      )
    })

    it('should have maxLength validation with value 5000', () => {
      expect(Answer.config.validation.maxLength.value).toBe(5000)
    })

    it('should have maxLength validation message', () => {
      expect(Answer.config.validation.maxLength.message).toBe(
        'Your answer must be no longer than 5000 characters'
      )
    })
  })
})

describe('HousingOtherPage', () => {
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
    it('should return peopleDisinfectionPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(PeopleDisinfectionPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
