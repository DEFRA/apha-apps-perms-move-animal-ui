import { ManureAndSlurryAnswer } from '../../common/model/answer/manure-and-slurry/manure-and-slurry.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { manureAndSlurryDetailsPage } from '../manure-and-slurry-details/index.js'
import { manureAndSlurryPage, ManureAndSlurryPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Has any manure or slurry been put on the grazing field in the past 60 days?'
const questionKey = 'manureAndSlurry'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/manure-and-slurry'

describe('ManureAndSlurryPage', () => {
  const page = new ManureAndSlurryPage()

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
    expect(page.Answer).toBe(ManureAndSlurryAnswer)
  })

  it('nextPage should return grazing field how separate page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(manureAndSlurryDetailsPage)
  })

  it('should export page', () => {
    expect(manureAndSlurryPage).toBeInstanceOf(ManureAndSlurryPage)
  })

  describePageSnapshot({
    describes: 'manureAndSlurryPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
