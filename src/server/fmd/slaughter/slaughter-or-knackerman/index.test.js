import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, slaughterOrKnackermanPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { SlaughterStubPage } from '../slaughter-stub/index.js'
import { SlaughtermanNamePage } from '../slaughterman-name/index.js'

const sectionKey = 'slaughter'
const questionKey = 'slaughterOrKnackerman'
const pageUrl = '/fmd/slaughter-information/slaughterman-or-knackerman'
const page = slaughterOrKnackermanPage
const question = 'Will the slaughter be done by a Slaughterman or Knackerman?'

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

  it('should have validation for no selection', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select whether the slaughter will be done by a Slaughterman or Knackerman'
    )
  })
})

describe('SlaughterOrKnackermanPage', () => {
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
      ['knackerman', SlaughterStubPage],
      ['slaughterman', SlaughtermanNamePage]
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
