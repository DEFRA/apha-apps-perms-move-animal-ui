import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, currentPurposeOfAnimalsPage } from './index.js'
import { TextAnswer } from '~/src/server/common/model/answer/text/text.js'
import { WhatIsMovingIdNumberPage } from '../what-is-moving-id-number/index.js'

const sectionKey = 'about'
const questionKey = 'currentPurposeOfAnimals'
const pageUrl = '/exotics/about-the-movement/what-is-moving/purpose'
const page = currentPurposeOfAnimalsPage
const question = 'What is the current use or purpose of the animals?'

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

  it('should have the right hint', () => {
    expect(Answer.config.hint).toBe(
      'For example, kept as pets or are on the premises for restocking reasons'
    )
  })

  it('should strip whitespace', () => {
    const answer = new Answer({ [questionKey]: '  some text  ' })
    expect(answer.toState()).toBe('some text')
  })

  it('should have the right character width', () => {
    expect(Answer.config.characterWidth).toBe(20)
  })
})

describe('CurrentPurposeOfAnimalsPage', () => {
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
    it('should return WhatIsMovingIdNumberPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(WhatIsMovingIdNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
