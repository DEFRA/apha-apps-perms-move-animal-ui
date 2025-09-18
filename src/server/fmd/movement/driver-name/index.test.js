import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, driverNamePage } from './index.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { DriverPhonePage } from '../driver-phone/index.js'

const sectionKey = 'movement'
const questionKey = 'driverName'
const pageUrl = '/fmd/movement-details/driver-name'
const page = driverNamePage
const question = "What is the vehicle driver's name?"

const payload = {
  firstName: 'first name',
  lastName: 'last name'
}

describe('Answer', () => {
  it('should be a Full name input', () => {
    expect(new Answer(payload)).toBeInstanceOf(FullNameAnswer)
  })

  it('should have the right empty first name message', () => {
    expect(Answer.config.validation.firstName.empty?.message).toBe(
      'Enter the first name of the vehicle driver'
    )
  })

  it('should have the right empty last name message', () => {
    expect(Answer.config.validation.lastName.empty?.message).toBe(
      'Enter the last name of the vehicle driver'
    )
  })
})

describe('DriverNamePage', () => {
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
    it('should return DriverPhonePage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DriverPhonePage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
