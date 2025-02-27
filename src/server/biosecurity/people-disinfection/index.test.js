import { PeopleDisinfectionAnswer } from '../../common/model/answer/people-disinfection/people-disinfection.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { disinfectantPage } from '../disinfectant/index.js'
import { peopleDisinfectionPage, PeopleDisinfectionPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'What measures are staff taking to reduce the risk of spreading TB from the resident cattle?'
const questionKey = 'peopleDisinfection'
const view = 'biosecurity/people-disinfection/index'
const pageUrl = '/biosecurity/people-disinfection'

describe('PeopleDisinfectionPage', () => {
  const page = new PeopleDisinfectionPage()

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct heading', () => {
    expect(page.heading).toBe(
      'Cleaning and disinfection measures taken by staff'
    )
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(PeopleDisinfectionAnswer)
  })

  it('nextPage should return disinfectant page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(disinfectantPage)
  })

  it('should export page', () => {
    expect(peopleDisinfectionPage).toBeInstanceOf(PeopleDisinfectionPage)
  })

  describePageSnapshot({
    describes: 'peopleDisinfectionPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
