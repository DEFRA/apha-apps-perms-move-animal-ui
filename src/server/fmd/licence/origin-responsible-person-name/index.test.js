import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, originResponsiblePersonNamePage } from './index.js'
import { FullNameAnswer } from '~/src/server/common/model/answer/full-name/full-name.js'
import { EmailAddressPage } from '../email-address/index.js'

const sectionKey = 'licence'
const questionKey = 'originResponsiblePersonName'
const pageUrl =
  '/fmd/receiving-the-licence/name-of-person-responsible-at-origin'
const page = originResponsiblePersonNamePage
const question = 'Who is responsible for the origin premises?'

const payload = {
  firstName: 'first name',
  lastName: 'last name'
}

describe('Answer', () => {
  it('should be a Full name input', () => {
    expect(new Answer(payload)).toBeInstanceOf(FullNameAnswer)
  })

  it('should have the right validation', () => {
    expect(Answer.config.validation.firstName.empty?.message).toBe(
      'Enter the first name of the person responsible for the origin premises'
    )

    expect(Answer.config.validation.lastName.empty?.message).toBe(
      'Enter the last name of the person responsible for the origin premises'
    )
  })
})

describe('OriginResponsiblePersonNamePage', () => {
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
    it('should return EmailAddressPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(EmailAddressPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
