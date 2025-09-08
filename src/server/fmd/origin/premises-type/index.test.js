import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, premisesTypePage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { CphNumberPage } from '../cph-number/index.js'

const sectionKey = 'origin'
const questionKey = 'premisesType'
const pageUrl = '/fmd/movement-origin/premises-type'
const page = premisesTypePage
const question = 'What type of premises is the origin?'

const payload = {
  [questionKey]: 'farm'
}

describe('Answer', () => {
  it('should be a Radio button input', () => {
    expect(new Answer(payload)).toBeInstanceOf(RadioButtonAnswer)
  })

  it('should have the right payload key', () => {
    expect(Answer.config.payloadKey).toBe(questionKey)
  })

  it('should have the correct validation message for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select the origin premises type'
    )
  })

  it('should have the expected options to select from', () => {
    expect(Object.keys(Answer.config.options)).toHaveLength(3)
    expect(Answer.config.options).toHaveProperty('farm')
    expect(Answer.config.options).toHaveProperty('smallholding')
    expect(Answer.config.options).toHaveProperty('another')
  })

  it('should have the correct label for farm option', () => {
    expect(Answer.config.options.farm.label).toBe('farm')
  })

  it('should have the correct label and hint for smallholding option', () => {
    expect(Answer.config.options.smallholding.label).toBe(
      'Smallholding or domestic residence'
    )
    expect(Answer.config.options.smallholding.hint).toBe(
      'A smallholding is typically under 50 acres'
    )
  })

  it('should have the correct label for another option', () => {
    expect(Answer.config.options.another.label).toBe('Another premises type')
  })
})

describe('validation', () => {
  it('should be valid for farm option', () => {
    const answer = new Answer({ [questionKey]: 'farm' })
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should be valid for smallholding option', () => {
    const answer = new Answer({ [questionKey]: 'smallholding' })
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should be valid for another option', () => {
    const answer = new Answer({ [questionKey]: 'another' })
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('should be invalid for empty input', () => {
    const answer = new Answer(undefined)
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(false)
    expect(errors[questionKey].text).toBe('Select the origin premises type')
  })

  it('should be invalid for unknown option', () => {
    const answer = new Answer({ [questionKey]: 'invalid-option' })
    const { isValid, errors } = answer.validate()

    expect(isValid).toBe(false)
    expect(errors[questionKey].text).toBe('Select the origin premises type')
  })
})

describe('html output', () => {
  it('should return correct label for farm', () => {
    const answer = new Answer({ [questionKey]: 'farm' })
    expect(answer.html).toBe('farm')
  })

  it('should return correct label for smallholding', () => {
    const answer = new Answer({ [questionKey]: 'smallholding' })
    expect(answer.html).toBe('Smallholding or domestic residence')
  })

  it('should return correct label for another', () => {
    const answer = new Answer({ [questionKey]: 'another' })
    expect(answer.html).toBe('Another premises type')
  })

  it('should return empty string for undefined value', () => {
    const answer = new Answer(undefined)
    expect(answer.html).toBe('')
  })
})

describe('PremisesTypePage', () => {
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
    it('should return CphNumberPage regardless of answer value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(CphNumberPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
