import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { EnterWhatIsMovingQuantityPage } from '../enter-what-is-moving-quantity/index.js'
import { Answer, enterWhatIsMovingPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'

const sectionKey = 'about'
const questionKey = 'whatAreYouMovingDetails'
const pageUrl = '/fmd/about-the-movement/what-is-moving/enter-what-is-moving'
const page = enterWhatIsMovingPage

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a text input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter information about what you are moving'
    )
  })

  it('should strip whitespace', () => {
    expect(Answer.config.stripWhitespace).toBe(true)
  })

  it('should define the right max lengnth input message', () => {
    expect(Answer.config.validation.maxLength).toStrictEqual({
      value: 100,
      message: 'Your answer must be no longer than 100 characters'
    })
  })
})

describe('EnterWhatIsMovingPage', () => {
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
    it('should return EnterWhatIsMovingQuantity for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EnterWhatIsMovingQuantityPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
