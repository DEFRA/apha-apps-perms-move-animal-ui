import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, isDesignatedPremisesPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { AnimalsOnPremisesPage } from '../animals-on-premises/index.js'

// TEMPLATE-TODO: import next page

const sectionKey = 'origin'
const questionKey = 'isDesignatedPremises'
const pageUrl = '/exotics/movement-origin/designated-premise'
const page = isDesignatedPremisesPage
const question = 'Is the premises designated?'

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

  it('should have the correct options in config', () => {
    expect(Answer.config.options).toEqual({
      yes: { label: 'Yes' },
      no: { label: 'No' },
      unknown: { label: "I don't know" }
    })
  })

  it('should have the correct validation message in config', () => {
    expect(Answer.config.validation).toEqual({
      empty: 'Enter what animals are on the premises'
    })
  })
})

describe('IsDesignatedPremisesPage', () => {
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
      ['yes', AnimalsOnPremisesPage],
      ['no', AnimalsOnPremisesPage]
    ])('for %s should return %s', (value, expectedPage) => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(expectedPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
