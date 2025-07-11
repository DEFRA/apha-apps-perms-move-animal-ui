import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, locationOfVisitPage } from './index.js'
import { RadioButtonAnswer } from '~/src/server/common/model/answer/radio-button/radio-button.js'
import { cphNumberPage } from '../cph-number/index.js'
import { hasACphNumberPage } from '../has-a-cph-number/index.js'
import { addressPage } from '../address/index.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'typeOfLocation'
const pageUrl = '/exotics/location-of-visit/visit'
const page = locationOfVisitPage
const question = 'Where will the visit take place?'

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

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty).toBe(
      'Select where the visit will take place'
    )
  })

  it('should have the correct options', () => {
    expect(Answer.config.options.farm.label).toBe('Farm')
    expect(Answer.config.options['corporate-holding'].label).toBe(
      'Corporate holding'
    )
    expect(Answer.config.options['domestic-residence'].label).toBe(
      'Domestic residence'
    )
    expect(Answer.config.options.other.label).toBe(
      'Another location (such as a zoo or show)'
    )
  })
})

describe('LocationOfVisitPage', () => {
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
      ['farm', cphNumberPage],
      ['corporate-holding', cphNumberPage],
      ['other', cphNumberPage]
    ])('for %s should return %s', (value, expectedPage) => {
      const answer = new Answer({ [questionKey]: value })
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBe(expectedPage)
    })

    describe('domestic-residence', () => {
      const answer = new Answer({ [questionKey]: 'domestic-residence' })
      const liveAnimals = {
        whatIsMoving: 'live-animals'
      }

      it('should return cphNumberPage for pigs, sheep-and-goats, or cattle', () => {
        const state = { about: { ...liveAnimals, typeOfAnimal: 'pigs' } }
        const nextPage = page.nextPage(answer, state)
        expect(nextPage).toBe(hasACphNumberPage)
      })

      it('should return hasACphNumberPage for pigs, sheep-and-goats, or cattle', () => {
        const state = {
          about: { ...liveAnimals, typeOfAnimal: 'sheep-and-goats' }
        }
        const nextPage = page.nextPage(answer, state)
        expect(nextPage).toBe(hasACphNumberPage)
      })

      it('should return addressPage for other animals', () => {
        const state = { about: { ...liveAnimals, typeOfAnimal: 'dogs' } }
        const nextPage = page.nextPage(answer, state)
        expect(nextPage).toBe(addressPage)
      })
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
