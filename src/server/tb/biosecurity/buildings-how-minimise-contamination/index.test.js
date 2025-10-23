import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { HousingOtherPage } from '../housing-other/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  Answer,
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
    expect(page.Answer).toBe(Answer)
  })

  it('nextPage should return people disinfection page', () => {
    const answer = new page.Answer({ [questionKey]: ['isolation'] })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('nextPage should return housingOtherPage', () => {
    const answer = new page.Answer({ [questionKey]: ['other'] })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBeInstanceOf(HousingOtherPage)
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
