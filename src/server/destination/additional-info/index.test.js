import { additionalInfoPage, AdditionalInfoPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { AdditionalInfoAnswer } from '../../common/model/answer/additional-info/additional-info.js'
import { destinationSummaryPage } from '../summary/index.js'

const sectionKey = 'destination'
const question = 'Enter any additional information (optional)'
const questionKey = 'additionalInfo'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/any-additional-info'

describe('AdditionalInfoPage', () => {
  const page = new AdditionalInfoPage()

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
    expect(page.Answer).toBe(AdditionalInfoAnswer)
  })

  it('nextPage should return destination summary page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(destinationSummaryPage)
  })

  it('should export page', () => {
    expect(additionalInfoPage).toBeInstanceOf(AdditionalInfoPage)
  })

  describePageSnapshot({
    describes: 'AdditionalInfoPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
