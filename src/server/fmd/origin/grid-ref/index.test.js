import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, gridRefPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { MockOriginPage } from '../mock-page/index.js'

const sectionKey = 'origin'
const questionKey = 'gridRef'
const pageUrl = '/fmd/movement-origin/grid-reference'
const page = gridRefPage
const question = 'What is the grid reference of the location?'

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

  it('should have the correct rows config', () => {
    expect(Answer.config.rows).toBe(4)
  })

  it('should have spellcheck disabled', () => {
    expect(Answer.config.spellcheck).toBe(false)
  })

  it('should have empty validation message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter the grid reference for the origin premises'
    )
  })

  it('should have maxLength validation value', () => {
    expect(Answer.config.validation.maxLength.value).toBe(5000)
  })

  it('should have maxLength validation message', () => {
    expect(Answer.config.validation.maxLength.message).toBe(
      'Your answer must be no longer than 5000 characters'
    )
  })
})

describe('GridRefPage', () => {
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
    it('should return MockOriginPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MockOriginPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
