import { fullNamePage, FullNamePage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'
import { emailAddressPage } from '../email-address/index.js'

const sectionKey = 'licence'
const question =
  'What is the name of the person registered as the keeper of the animals?'
const questionKey = 'fullName'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/licence-name'

describe('FullNamePage', () => {
  let page

  beforeEach(() => {
    page = new FullNamePage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(OwnerFullNameAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(emailAddressPage)
  })

  it('should export page', () => {
    expect(fullNamePage).toBeInstanceOf(FullNamePage)
  })

  describePageSnapshot({
    describes: 'FullNamePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
