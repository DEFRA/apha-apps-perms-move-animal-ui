import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, tlaPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MockOriginPage } from '../mock-page/index.js'
import { PremisesTypePage } from '../premises-type/index.js'

const sectionKey = 'origin'
const questionKey = 'tla'
const pageUrl = '/fmd/movement-origin/TLA-yes-no'
const page = tlaPage
const question = 'Is the origin premises a TLA?'

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

  it('should have the correct config properties', () => {
    expect(Answer.config.isQuestionHeading).toBe(false)
    expect(Answer.config.validation.empty).toBe(
      'Select if the origin premises is a TLA'
    )
  })
})

describe('TLaPage', () => {
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
      ['yes', MockOriginPage],
      ['no', PremisesTypePage]
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
