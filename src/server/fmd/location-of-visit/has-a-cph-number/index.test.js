import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, hasACphNumberPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CphNumberPage } from '../cph-number/index.js'
import { CphNeededExitPage } from '../cph-needed/index.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'hasACphNumber'
const pageUrl = '/fmd/location-of-visit/cph-yes-no'
const page = hasACphNumberPage
const question =
  'Does the premises where the visit is happening have a county parish holding (CPH) number?'

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

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select if the premises where the visit is happening has a CPH number'
    )
  })

  it('should have the correct options', () => {
    expect(Answer.config.options.yes.label).toBe('Yes')
    expect(Answer.config.options.no.label).toBe('No')
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
      ['no', CphNeededExitPage]
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
