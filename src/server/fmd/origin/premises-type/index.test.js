import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, premisesTypePage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CphNumberPage } from '../cph-number/index.js'

const sectionKey = 'origin'
const questionKey = 'premisesType'
const pageUrl = '/fmd/movement-origin/premises-type'
const page = premisesTypePage
const question = 'What type of premises is the origin?'

const payload = {
  [questionKey]: 'farm'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the correct validation message for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the origin premises type'
    )
  })
})

describe('PremisesTypePage', () => {
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
    it('should return CphNumberPage regardless of answer value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
