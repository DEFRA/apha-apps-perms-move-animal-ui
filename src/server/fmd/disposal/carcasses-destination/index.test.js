import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, carcassesDestinationPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CarcassesSomewhereElseExitPage } from '../carcasses-somewhere-else/index.js'
import { DestinationBusinessNamePage } from '../destination-business-name/index.js'

// TEMPLATE-TODO: import next page

const sectionKey = 'disposal'
const questionKey = 'carcassesDestination'
const pageUrl = '/fmd/disposal-of-animals/carcasses-premises-type'
const page = carcassesDestinationPage
const question = 'Where are the carcasses going?'

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

  it('should have the correct validation message', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select where the carcasses are going'
    )
  })
})

describe('CarcassesDestinationPage', () => {
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
      ['knackers-yard', DestinationBusinessNamePage],
      ['rendering-plant', DestinationBusinessNamePage],
      ['incinerator', DestinationBusinessNamePage],
      ['hunt-kennel', DestinationBusinessNamePage],
      ['somewhere-else', CarcassesSomewhereElseExitPage]
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
