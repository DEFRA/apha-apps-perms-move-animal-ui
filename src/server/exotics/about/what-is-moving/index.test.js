import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { Answer, whatIsMovingPage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { EnterWhatIsMovingPage } from '../enter-what-is-moving/index.js'
import { TypeOfAnimalPage } from '../type-of-animal/index.js'
import { ExitPageAboutMovementPage } from '../exit-page-about-movement/index.js'

const page = whatIsMovingPage
const payload = {
  whatIsMoving: 'carcasses'
}
const sectionKey = 'about'
const questionKey = 'whatIsMoving'
const pageUrl = '/exotics/about-the-movement/what-is-moving'

describe('Answer', () => {
  it('should be a radio button', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.validation.empty).toBe('Select what you are moving')
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

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it.each([
      ['live-animals', TypeOfAnimalPage],
      ['carcasses', EnterWhatIsMovingPage],
      ['animal-by-products-and-waste', EnterWhatIsMovingPage],
      ['equipment', ExitPageAboutMovementPage],
      ['bedding-and-feed', ExitPageAboutMovementPage],
      ['other', ExitPageAboutMovementPage]
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
