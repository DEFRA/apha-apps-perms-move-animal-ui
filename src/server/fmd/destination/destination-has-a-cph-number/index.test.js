import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, destinationHasACphNumberPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CheckAnswersPage } from '../check-answers/index.js'
import { CphPremisesPage } from '../cph-premises/index.js'

const sectionKey = 'destination'
const questionKey = 'destinationHasACphNumber'
const pageUrl = '/fmd/movement-destination/cph-number-yes-no'
const page = destinationHasACphNumberPage
const question =
  'Does the destination premises have a county parish holding (CPH) number?'

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

  it('should have the correct validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if you know the CPH number for the destination premises'
    )
  })
})

describe('DestinationHasACphNumberPage', () => {
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
      ['yes', CphPremisesPage],
      ['no', CheckAnswersPage]
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
