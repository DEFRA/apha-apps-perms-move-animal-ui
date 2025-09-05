import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, disposalDatePage } from './index.js'
import { DateAnswer } from '~/src/server/common/model/answer/date/date.js'
import { CarcassesDestinationPage } from '../carcasses-destination/index.js'
import { AnimalByProductsDestinationPage } from '../animal-by-products-destination/index.js'

const sectionKey = 'disposal'
const questionKey = 'disposalDate'
const pageUrl = '/fmd/disposal-of-animal/date-of-disposal'
const page = disposalDatePage
const question = 'What date do you expect the disposal to take place?'

const payload = {
  day: '01',
  month: '01',
  year: '2035'
}

describe('Answer', () => {
  it('should be a Date input', () => {
    expect(new Answer(payload)).toBeInstanceOf(DateAnswer)
  })

  it('should have the right validation', () => {
    const { validation } = Answer.config

    expect(validation.missingDate.message).toBe('Enter the disposal date')
    expect(validation.missingDay.message).toBe(
      'Disposal date must include a day'
    )
    expect(validation.missingMonth.message).toBe(
      'Disposal date must include a month'
    )
    expect(validation.missingYear.message).toBe(
      'Disposal date must include a year'
    )
    expect(validation.invalidDay.message).toBe(
      'Disposal day must be a real date'
    )
    expect(validation.invalidMonth.message).toBe(
      'Disposal month must be a number between 1 and 12'
    )
    expect(validation.invalidYear.message).toBe(
      'Disposal year must be a real date'
    )
    expect(validation.nonFourDigitYear.message).toBe(
      'Disposal year must include 4 numbers'
    )
    expect(validation.invalidDate.message).toBe(
      'Disposal date must be a real date'
    )
  })
})

describe('DisposalDatePage', () => {
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
    const answer = new Answer(payload)

    it('should return carcassesDestinationPage for disposals of whole animals', () => {
      const nextPage = page.nextPage(answer, {
        disposal: { disposalWholeAnimal: 'yes' }
      })
      expect(nextPage).toBeInstanceOf(CarcassesDestinationPage)
    })

    it('should return animalByProductsDestinationPage for disposals of whole animals', () => {
      const nextPage = page.nextPage(answer, {
        disposal: { disposalWholeAnimal: 'no' }
      })
      expect(nextPage).toBeInstanceOf(AnimalByProductsDestinationPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
