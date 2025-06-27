import { DisinfectantAnswer } from '../../../common/model/answer/disinfectant/disinfectant.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { disinfectantDilutionPage } from '../disinfectant-dilution/index.js'
import { disinfectantPage, DisinfectantPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'What disinfectant are you using?'
const questionKey = 'disinfectant'
const view = 'tb/biosecurity/disinfectant/index'
const pageUrl = '/biosecurity/disinfectant'

describe('DisinfectantPage', () => {
  const page = new DisinfectantPage()

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
    expect(page.Answer).toBe(DisinfectantAnswer)
  })

  it('nextPage should return disinfectant dilution page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(disinfectantDilutionPage)
  })

  it('should export page', () => {
    expect(disinfectantPage).toBeInstanceOf(DisinfectantPage)
  })

  describePageSnapshot({
    describes: 'disinfectantPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
