import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, responsibleForMilkMovementPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { MilkAnimalPage } from '../milk-animal/index.js'
import { LicenceNotNeededExitPage } from '../licence-not-needed/index.js'

const sectionKey = 'about'
const questionKey = 'responsibleForMilkMovement'
const pageUrl =
  '/fmd/about-the-movement-or-activity/responsibility-for-movement'
const page = responsibleForMilkMovementPage
const question = 'Are you responsible for organising the movement of the milk?'

const payload = {
  [questionKey]: 'yes'
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
      empty:
        'Select if you are responsible for organising the movement of the milk'
    })
  })
})

describe('ResponsibleForMilkMovementPage', () => {
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
      ['yes', MilkAnimalPage],
      ['no', LicenceNotNeededExitPage]
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
