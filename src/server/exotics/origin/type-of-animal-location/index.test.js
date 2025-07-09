import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, typeOfAnimalLocationPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { AnimalLocationCphNumberPage } from '../animal-location-cph-number/index.js'
import { AddressPage } from '../address/index.js'
import { TypeOfAnimalLocationOtherPage } from '../type-of-animal-location-other/index.js'

const sectionKey = 'origin'
const questionKey = 'typeOfAnimalLocation'
const pageUrl = '/exotics/movement-origin/animal-location'
const page = typeOfAnimalLocationPage
const question = 'Where are the animals kept?'

const payload = {
  [questionKey]: 'other'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have a config object', () => {
    expect(Answer.config).toBeDefined()
    expect(typeof Answer.config).toBe('object')
  })

  it('should have the correct label in config', () => {
    expect(Answer.config.options.farm.label).toBe('Farm')
    expect(Answer.config.options['corporate-holding'].label).toBe(
      'Corporate holding'
    )
    expect(Answer.config.options['domestic-residence'].label).toBe(
      'Domestic residence'
    )
    expect(Answer.config.options.other.label).toBe('Other')
  })
})

describe('TypeOfAnimalLocationPage', () => {
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
      ['farm', AnimalLocationCphNumberPage],
      ['corporate-holding', AnimalLocationCphNumberPage],
      ['domestic-residence', AddressPage],
      ['other', TypeOfAnimalLocationOtherPage]
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
