import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { disinfectantPage } from '../disinfectant/index.js'
import { slurryManureOtherPage } from '../slurry-manure-other/index.js'
import {
  manureAndSlurryDetailsPage,
  ManureAndSlurryDetailsPage,
  Answer
} from './index.js'

const sectionKey = 'biosecurity'
const question = 'How will you manage slurry and manure?'
const questionKey = 'manureAndSlurryDetails'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/manure-and-slurry-details'

describe('Answer', () => {
  it('should have the correct hint', () => {
    expect(Answer.config.hint).toBe(
      'Only select the measures you are taking. You do not need to select them all to receive your licence.'
    )
  })

  it('should have the correct options', () => {
    expect(Answer.config.options['not-purchased'].label).toBe(
      ' Manure is not purchased from other farms'
    )
    expect(Answer.config.options.stored.label).toBe(
      "Manure and slurry is securely stored so domestic and wild animals can't access it"
    )
    expect(Answer.config.options['three-weeks'].label).toBe(
      'Manure is stored for at least 3 weeks before spreading on pasture'
    )
    expect(Answer.config.options['six-months'].label).toBe(
      'Slurry is stored for at least 6 months before spreading on pasture'
    )
    expect(Answer.config.options.other.label).toBe('Other measures')
  })

  it('should have validation for empty input', () => {
    expect(Answer.config.validation.empty?.message).toBe(
      'Enter how you will manage manure and slurry'
    )
  })
})

describe('manureAndSlurryDetails', () => {
  const page = manureAndSlurryDetailsPage

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
    expect(page.Answer).toBe(Answer)
  })

  it('nextPage should return disinfectant page', () => {
    const nextPage = page.nextPage({
      value: ['stored']
    })
    expect(nextPage).toBe(disinfectantPage)
  })

  it('nextPage should return slurryManureOtherPage', () => {
    const nextPage = page.nextPage({
      value: ['other']
    })
    expect(nextPage).toBe(slurryManureOtherPage)
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
