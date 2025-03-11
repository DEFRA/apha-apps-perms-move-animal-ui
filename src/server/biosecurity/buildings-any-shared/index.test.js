import { BuildingsAnySharedAnswer } from '../../common/model/answer/buildings-any-shared/buildings-any-shared.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage, BuildingsAnySharedPage } from './index.js'
import { buildingsHowMinimiseContaminationPage } from '../buildings-how-minimise-contamination/index.js'
import { equipmentAnySharedPage } from '../equipment-any-shared/index.js'

const sectionKey = 'biosecurity'
const question = 'Will the incoming cattle be housed?'
const questionKey = 'buildingsAnyShared'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/buildings-any-shared'

describe('BuildingsAnySharedPage', () => {
  const page = new BuildingsAnySharedPage()

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
    expect(page.Answer).toBe(BuildingsAnySharedAnswer)
  })

  it('nextPage should return how to minimise contamination page when answer is "yes"', () => {
    const answer = new BuildingsAnySharedAnswer({ buildingsAnyShared: 'yes' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(buildingsHowMinimiseContaminationPage)
  })

  it('nextPage should return people disinfection page when answer is "no"', () => {
    const answer = new BuildingsAnySharedAnswer({ buildingsAnyShared: 'no' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(equipmentAnySharedPage)
  })

  it('should export page', () => {
    expect(buildingsAnySharedPage).toBeInstanceOf(BuildingsAnySharedPage)
  })

  describePageSnapshot({
    describes: 'buildingsAnySharedPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
