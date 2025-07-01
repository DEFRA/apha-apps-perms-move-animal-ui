import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { Answer, movementTypePage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { WhatIsMovingPage } from '../what-is-moving/index.js'
import { CheckAnswersPage } from '../check-answers/index.js'

const payload = {
  movementType: 'visit'
}
const sectionKey = 'about'
const questionKey = 'movementType'
const pageUrl = '/about-the-movement/movement-type'

describe('Answer', () => {
  it('should be a radio button', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe('movementType')
  })

  it('should define the right empty input message', () => {
    expect(Answer.config.errors.emptyOptionText).toBe(
      'Select the movement type'
    )
  })
})

describe('MovementTypePage', () => {
  const page = movementTypePage

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
    it('should return WhatIsMovingPage for onto farm', () => {
      const answer = new Answer({ movementType: 'onto-premises' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(WhatIsMovingPage)
    })

    it('should return WhatIsMovingPage off of farm', () => {
      const answer = new Answer({ movementType: 'off-premises' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(WhatIsMovingPage)
    })

    it('should return CheckAnswersPage for visit', () => {
      const answer = new Answer({ movementType: 'visit' })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBeInstanceOf(CheckAnswersPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
