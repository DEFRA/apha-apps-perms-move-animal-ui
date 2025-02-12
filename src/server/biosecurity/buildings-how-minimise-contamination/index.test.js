import { BuildingsHowMinimiseContaminationAnswer } from '../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  buildingsHowMinimiseContaminationPage,
  BuildingsHowMinimiseContaminationPage
} from './index.js'

const sectionKey = 'biosecurity'
const question = 'How will you reduce building and equipment contamination?'
const questionKey = 'buildingsHowMinimiseContamination'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/buildings-how-minimise-contamination'

describe('BuildingsHowMinimiseContaminationPage', () => {
  const page = new BuildingsHowMinimiseContaminationPage()

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
    expect(page.Answer).toBe(BuildingsHowMinimiseContaminationAnswer)
  })

  it('nextPage should return people disinfection page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('should export page', () => {
    expect(buildingsHowMinimiseContaminationPage).toBeInstanceOf(
      BuildingsHowMinimiseContaminationPage
    )
  })

  describePageSnapshot({
    describes: 'buildingsHowMinimiseContaminationPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
