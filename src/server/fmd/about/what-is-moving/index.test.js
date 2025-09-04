import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, whatIsMovingPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MoveToSlaughterPage } from '../move-to-slaughter/index.js'
import { TypeOfAnimalsPage } from '../type-of-animals/index.js'
import { ResponsibleMilkPage } from '../responsible-milk/index.js'
import { MovementOnExitPage } from '../movement-on-exit-page/index.js'

const sectionKey = 'about'
const questionKey = 'whatIsMoving'
const pageUrl = '/fmd/about-the-movement-or-activity/what-is-moving'
const page = whatIsMovingPage
const question = 'What are you moving?'

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
    expect(Answer.config.validation).toEqual({
      empty: 'Select what you are moving'
    })
  })
})

describe('WhatIsMovingPage', () => {
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
      ['live-animals', MoveToSlaughterPage],
      ['carcasses', MovementOnExitPage],
      ['milk', MovementOnExitPage]
    ])(
      'for %s should return %s for movements on to the farm',
      (value, expectedPage) => {
        const answer = new Answer({ [questionKey]: value })
        const nextPage = page.nextPage(answer, {
          about: { movementActivityType: 'on-to-farm' }
        })
        expect(nextPage).toBeInstanceOf(expectedPage)
      }
    )

    it.each([
      ['live-animals', MoveToSlaughterPage],
      ['carcasses', TypeOfAnimalsPage],
      ['milk', ResponsibleMilkPage]
    ])(
      'for %s should return %s for movements off the farm',
      (value, expectedPage) => {
        const answer = new Answer({ [questionKey]: value })
        const nextPage = page.nextPage(answer, {
          about: { movementActivityType: 'off-of-farm' }
        })
        expect(nextPage).toBeInstanceOf(expectedPage)
      }
    )
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
