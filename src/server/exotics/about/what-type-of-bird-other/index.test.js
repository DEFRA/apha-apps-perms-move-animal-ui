import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, whatTypeOfBirdOtherPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { NumberOfAnimalsPage } from '../number-of-animals/index.js'

const sectionKey = 'about'
const questionKey = 'whatTypeOfBirdOther'
const pageUrl =
  '/exotics/about-the-movement/what-is-moving/select-animals/birds/enter-bird-type'
const page = whatTypeOfBirdOtherPage
const question = 'What type of bird are you moving?'

const payload = {
  [questionKey]: 'some text'
}

describe('Answer', () => {
  it('should be a Text input', () => {
    expect(new Answer(payload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have character width of 20', () => {
    expect(Answer.config.characterWidth).toBe(20)
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter what type of birds you are moving'
    )
  })

  it('should have validation for maximum length', () => {
    expect(Answer.config.validation.maxLength?.value).toBe(1000)
    expect(Answer.config.validation.maxLength?.message).toBe(
      'Your answer must be no longer than 100 characters'
    )
  })
})

describe('WhatTypeOfBirdOtherPage', () => {
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
    it('should return NumberOfAnimalsPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(NumberOfAnimalsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
