import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, willMoveToTlaPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { PremisesTypePage } from '../premises-type/index.js'
import { TlaOrCphNumberPage } from '../tla-or-cph-number/index.js'

const sectionKey = 'destination'
const questionKey = 'willMoveToTla'
const pageUrl = '/fmd/movement-destination/TLA-yes-no'
const page = willMoveToTlaPage
const question =
  'Will the animals move on to a temporary land association (TLA)?'

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

  it('should have the right validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if the destination premises is a TLA'
    )
  })
})

describe('WillMoveToTlaPage', () => {
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
      ['yes', TlaOrCphNumberPage],
      ['no', PremisesTypePage]
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
