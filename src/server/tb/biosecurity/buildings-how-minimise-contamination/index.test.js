import { BuildingsHowMinimiseContaminationAnswer } from '../../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  buildingsHowMinimiseContaminationPage,
  BuildingsHowMinimiseContaminationPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'How will you reduce the risk of spreading TB from the resident herd to the incoming animals during housing?'
const questionKey = 'buildingsHowMinimiseContamination'
const view = 'tb/biosecurity/buildings-how-minimise-contamination/index'
const pageUrl = '/biosecurity/buildings-how-minimise-contamination'
const customHeading = 'Housing the incoming animals'

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

  it('should have the correct heading', () => {
    expect(page.heading).toBe(customHeading)
  })

  it('should have the correct title', () => {
    expect(page.title).toBe(question)
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
