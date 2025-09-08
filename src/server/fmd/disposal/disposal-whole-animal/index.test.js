import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, disposalWholeAnimalPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { DisposalDatePage } from '../disposal-date/index.js'

const sectionKey = 'disposal'
const questionKey = 'disposalWholeAnimal'
const pageUrl = '/fmd/disposal-of-animal/whole-animal'
const page = disposalWholeAnimalPage
const question = 'Will you dispose of the whole animal?'

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

  it('should have the right validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if you are disposing of the whole animal'
    )
  })
})

describe('DisposalWholeAnimalPage', () => {
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
    it('should return DisposalDatePage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DisposalDatePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
