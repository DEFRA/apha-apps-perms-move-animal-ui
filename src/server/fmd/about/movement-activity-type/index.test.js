import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, movementActivityTypePage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { WhatIsMovingPage } from '../what-is-moving/index.js'
import { AnimalSlaughteredPage } from '../animal-slaughtered/index.js'

const sectionKey = 'about'
const questionKey = 'movementActivityType'
const pageUrl = '/fmd/about-the-movement-or-activity/type'
const page = movementActivityTypePage
const question =
  'Which type of movement or activity does your application relate to?'

const payload = {
  [questionKey]: 'slaughter-onsite'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the right error on empty options', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the type of movement or activity your application relates to'
    )
  })
})

describe('MovementActivityTypePage', () => {
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
    it('should return animalSlaughteredPage for off-farm movement', () => {
      const answer = new Answer({ [questionKey]: 'slaughter-onsite' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(AnimalSlaughteredPage)
    })

    it('should return whatIsMovingPage for any other movement', () => {
      const answer = new Answer({ [questionKey]: 'off-of-farm' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(WhatIsMovingPage)
    })

    it.each([['on-to-farm'], ['off-of-farm']])(
      'should return WhatIsMovingPage for %s',
      (value) => {
        const answer = new Answer({ [questionKey]: value })
        const nextPage = page.nextPage(answer)
        expect(nextPage).toBeInstanceOf(WhatIsMovingPage)
      }
    )
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
