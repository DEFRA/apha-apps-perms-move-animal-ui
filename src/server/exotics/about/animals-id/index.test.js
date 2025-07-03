import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalsIdPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'about'
const questionKey = 'animalsId'
const pageUrl = '/exotics/about-the-movement/what-is-moving/id-numbers'
const page = animalsIdPage
const question = 'What are the ID numbers for animals you are moving?'

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

  it('should have the correct hint', () => {
    expect(Answer.config.hint).toBe(
      'For example, ear tags, slap marks or flock numbers'
    )
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  it('should have 10 rows', () => {
    expect(Answer.config.rows).toBe(10)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'You must provide the ID numbers for the animals you are moving'
    )
  })

  it('should have validation for maximum length', () => {
    expect(Answer.config.validation.maxLength.value).toBe(10000)
    expect(Answer.config.validation.maxLength.message).toBe(
      'ID numbers must be 1000 characters or less'
    )
  })
})

describe('AnimalsIdPage', () => {
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
    it('should return CheckAnswersPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
