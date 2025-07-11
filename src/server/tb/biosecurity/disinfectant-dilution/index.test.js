import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import { disinfectantDilutionPage, DisinfectantDilutionPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'What dilution rate are you using for your disinfectant?'
const questionKey = 'dilutionRate'
const view = 'tb/biosecurity/disinfectant-dilution/index'
const pageUrl = '/biosecurity/disinfectant-dilution'

describe('DisinfectantDilutionPage', () => {
  const page = new DisinfectantDilutionPage()

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
    expect(page.Answer).toBe(DilutionRateAnswer)
  })

  it('nextPage should return buildings any shared page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(buildingsAnySharedPage)
  })

  it('should export page', () => {
    expect(disinfectantDilutionPage).toBeInstanceOf(DisinfectantDilutionPage)
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
