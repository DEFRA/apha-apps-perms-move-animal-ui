import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, cphNumberKnownPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CphNeededPage } from '../cph-needed/index.js'
import { CphNumberPage } from '../cph-number/index.js'

const sectionKey = 'destination'
const questionKey = 'cphNumberKnown'
const pageUrl = '/fmd/movement-destination/cph-yes-no'
const page = cphNumberKnownPage
const question = 'Do you know the CPH number of the destination?'

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
    expect(Answer.config.validation.empty).toBe(
      'Select if you know the CPH number of the destination'
    )
  })
})

describe('HasACphNumberPage', () => {
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
      ['yes', CphNumberPage],
      ['no', CphNeededPage]
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
