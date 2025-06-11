import {
  restockAdditionalInfoPage,
  RestockAdditionalInfoPage
} from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { RestockAdditionalInfoAnswer } from '../../common/model/answer/restock-additional-info/restock-additional-info.js'
import { additionalInfoPage } from '../additional-info/index.js'

const sectionKey = 'destination'
const question = 'What is the reason for restocking?'
const questionKey = 'restockAdditionalInfo'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/restocking-additional-info-reason-other'

describe('RestockAdditionalInfoPage', () => {
  const page = new RestockAdditionalInfoPage()

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
    expect(page.Answer).toBe(RestockAdditionalInfoAnswer)
  })

  it('nextPage should return destination summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(additionalInfoPage)
  })

  it('should export page', () => {
    expect(restockAdditionalInfoPage).toBeInstanceOf(RestockAdditionalInfoPage)
  })

  describePageSnapshot({
    describes: 'RestockAdditionalInfoPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
