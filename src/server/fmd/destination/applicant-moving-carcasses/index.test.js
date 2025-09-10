import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, applicantMovingCarcassesPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { DestinationBusinessNamePage } from '../destination-business-name/index.js'
import { ThirdPartyMovingPage } from '../third-party-moving/index.js'

const sectionKey = 'destination'
const questionKey = 'applicantMovingCarcasses'
const pageUrl = '/fmd/movement-destination/business-receiving-the-licence'
const page = applicantMovingCarcassesPage
const question = 'Are you moving the carcasses?'

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
      empty: 'Select if you are moving the carcasses'
    })
  })
})

describe('ApplicantMovingCarcassesPage', () => {
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
      ['yes', DestinationBusinessNamePage],
      ['no', ThirdPartyMovingPage]
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
