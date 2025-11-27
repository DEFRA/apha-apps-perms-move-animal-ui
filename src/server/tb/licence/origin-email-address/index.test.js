import { OriginEmailAddressPage, originEmailAddressPage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { destinationEmailAddressPage } from '../destination-email-address/index.js'
import { OriginEmailAddressAnswer } from '~/src/server/common/model/answer/origin-email-address/origin-email-address.js'

const sectionKey = 'licence'
const question = 'What is the email address for the origin premises?'
const questionKey = 'originEmail'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/origin-email-address'

describe('OriginEmailAddressPage', () => {
  let page

  beforeEach(() => {
    page = new OriginEmailAddressPage()
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
    expect(page.Answer).toBe(OriginEmailAddressAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(destinationEmailAddressPage)
  })

  it('should export page', () => {
    expect(originEmailAddressPage).toBeInstanceOf(OriginEmailAddressPage)
  })

  describePageSnapshot({
    describes: 'OriginEmailAddressPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
