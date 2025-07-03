import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, enterWhatIsMovingDescriptionPage } from './index.js'
import { TextAreaAnswer } from '~/src/server/common/model/answer/text-area/text-area.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const sectionKey = 'about'
const questionKey = 'whatAreYouMovingDescrition'
const pageUrl =
  '/exotics/about-the-movement/what-is-moving/enter-what-is-moving/description'
const page = enterWhatIsMovingDescriptionPage

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a text area input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAreaAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter information on what you are moving'
    )
  })

  it('should define the right max lengnth input message', () => {
    expect(Answer.config.validation.maxLength).toStrictEqual({
      value: 5000,
      message: 'Your answer must be no longer than 5000 characters'
    })
  })
})

describe('EnterWhatIsMovingDescriptionPage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return EnterWhatIsMovingDescriptionPage for any value', () => {
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
