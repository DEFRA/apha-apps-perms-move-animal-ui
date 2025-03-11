import { ManureAndSlurryDetailsAnswer } from '../../common/model/answer/manure-and-slurry-details/manure-and-slurry-details.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import {
  manureAndSlurryDetailsPage,
  ManureAndSlurryDetailsPage
} from './index.js'

const sectionKey = 'biosecurity'
const question = 'How will you manage manure and slurry?'
const questionKey = 'manureAndSlurryDetails'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/manure-and-slurry-details'

describe('manureAndSlurryDetails', () => {
  const page = new ManureAndSlurryDetailsPage()

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
    expect(page.Answer).toBe(ManureAndSlurryDetailsAnswer)
  })

  it('nextPage should return any shared buildings page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(buildingsAnySharedPage)
  })

  it('should export page', () => {
    expect(manureAndSlurryDetailsPage).toBeInstanceOf(
      ManureAndSlurryDetailsPage
    )
  })

  describePageSnapshot({
    describes: 'manureAndSlurryDetailsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
