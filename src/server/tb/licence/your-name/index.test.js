import { YourNamePage, yourNamePage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { emailAddressPage } from '../email-address/index.js'
import { YourNameAnswer } from '~/src/server/common/model/answer/your-name/your-name.js'

const sectionKey = 'licence'
const question = 'What is your name?'
const questionKey = 'yourName'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/your-name'

describe('YourNamePage', () => {
  let page

  beforeEach(() => {
    page = new YourNamePage()
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
    expect(page.Answer).toBe(YourNameAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(emailAddressPage)
  })

  it('should export page', () => {
    expect(yourNamePage).toBeInstanceOf(YourNamePage)
  })

  describePageSnapshot({
    describes: 'YourNamePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
