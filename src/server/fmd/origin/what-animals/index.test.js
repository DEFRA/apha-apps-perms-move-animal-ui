import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, whatAnimalsPage } from './index.js'
import { CheckboxAnswer } from '~/src/server/common/model/answer/checkbox/checkbox.js'
import { CheckAnswersPage } from '../check-answers/index.js'
import { MockOriginPage } from '../mock-page/index.js'

const sectionKey = 'origin'
const questionKey = 'whatAnimals'
const pageUrl = '/fmd/movement-origin/animals-kept-on-premises'
const page = whatAnimalsPage
const question = 'What animals are kept on the premises?'

const payload = {
  [questionKey]: ['camelids']
}

describe('Answer', () => {
  it('should be a Checkbox input', () => {
    expect(new Answer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the correct hint', () => {
    expect(Answer.config.hint).toBe('Select all that apply')
  })

  it('should have the correct validation error message', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Select what animals are kept on the premises'
    )
  })
})

describe('WhatAnimalsPage', () => {
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
    it('should return CheckAnswersPage page for any value except other', () => {
      const answer = new Answer(payload)
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })

    it('should return MockOriginPage page for any value except other', () => {
      const answer = new Answer({
        [questionKey]: ['other']
      })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(MockOriginPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
