import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, animalLocationHasACphNumberPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { AnimalLocationCphNumberPage } from '../animal-location-cph-number/index.js'
import { CphNeededExitPage } from '../cph-needed/index.js'

const sectionKey = 'origin'
const questionKey = 'animalLocationHasACphNumber'
const pageUrl = '/fmd/movement-origin/animal-location/cph-yes-no'
const page = animalLocationHasACphNumberPage
const question =
  'Does the origin premises have a county parish holding (CPH) number?'

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

  it('should have the correct options in config', () => {
    expect(Answer.config.options).toEqual({
      yes: { label: 'Yes' },
      no: { label: 'No' }
    })
  })

  it('should have the correct validation message in config', () => {
    expect(Answer.config.validation).toEqual({
      empty: 'Select if the origin premises has a CPH number'
    })
  })

  it('should set value from payload', () => {
    const answer = new Answer({ [questionKey]: 'yes' })
    expect(answer.value).toBe('yes')
  })

  it('should return undefined for value if not in payload', () => {
    const answer = new Answer({})
    expect(answer.value).toBeUndefined()
  })
})

describe('AnimalLocationHasACphNumberPage', () => {
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
      ['yes', AnimalLocationCphNumberPage],
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
