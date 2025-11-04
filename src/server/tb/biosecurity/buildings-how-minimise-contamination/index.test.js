import { BuildingsHowMinimiseContaminationAnswer } from '../../../common/model/answer/buildings-how-minimise-contamination/buildings-how-minimise-contamination.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { buildingsHowMinimiseContaminationOtherPage } from './other/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  buildingsHowMinimiseContaminationPage,
  BuildingsHowMinimiseContaminationPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Which measures are being taken to reduce the spread of TB during housing?'
const questionKey = 'buildingsHowMinimiseContamination'
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

  it('should have the correct title', () => {
    expect(page.title).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(BuildingsHowMinimiseContaminationAnswer)
  })

  it('nextPage should return other measures page when answer includes "other"', () => {
    const answer = new BuildingsHowMinimiseContaminationAnswer({
      buildingsHowMinimiseContamination: ['other']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(buildingsHowMinimiseContaminationOtherPage)
  })

  it('nextPage should return people disinfection page when answer does not include "other"', () => {
    const answer = new BuildingsHowMinimiseContaminationAnswer({
      buildingsHowMinimiseContamination: ['cleaning']
    })
    const nextPage = page.nextPage(answer)
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
