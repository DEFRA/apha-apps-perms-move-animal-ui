import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, emailOrPostPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { EmailPage } from '../email/index.js'
import { SelectPostCanNotUseThisServicePage } from '../select-post-can-not-use-this-service/index.js'

const sectionKey = 'licence'
const questionKey = 'emailOrPost'
const pageUrl = '/exotics/receiving-the-licence/email-or-post'
const page = emailOrPostPage
const question = 'How would you like this licence sent to you?'

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

  it('should have the right validation', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select how you would like this licence sent to you'
    )
  })
})

describe('EmailOrPostPage', () => {
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
      ['email', EmailPage],
      ['post', SelectPostCanNotUseThisServicePage]
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
