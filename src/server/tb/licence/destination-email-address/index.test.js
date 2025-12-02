import {
  DestinationEmailAddressPage,
  destinationEmailAddressPage
} from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { licenceSummaryPage } from '../check-answers/index.js'
import { DestinationEmailAddressAnswer } from '~/src/server/common/model/answer/destination-email-address/destination-email-address.js'

const sectionKey = 'licence'
const question = 'What is your email address?'
const questionKey = 'destinationEmail'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/destination-email-address'

describe('DestinationEmailAddressPage', () => {
  let page

  beforeEach(() => {
    page = new DestinationEmailAddressPage()
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
    expect(page.Answer).toBe(DestinationEmailAddressAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(licenceSummaryPage)
  })

  it('should export page', () => {
    expect(destinationEmailAddressPage).toBeInstanceOf(
      DestinationEmailAddressPage
    )
  })

  describePageSnapshot({
    describes: 'DestinationEmailAddressPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
