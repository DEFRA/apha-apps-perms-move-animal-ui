import { BuildingsHowMinimiseContaminationOtherAnswer } from '../../../../common/model/answer/buildings-how-minimise-contamination-other/buildings-how-minimise-contamination-other.js'
import { describePageSnapshot } from '../../../../common/test-helpers/snapshot-page.js'
import { peopleDisinfectionPage } from '../../people-disinfection/index.js'
import {
  buildingsHowMinimiseContaminationOtherPage,
  BuildingsHowMinimiseContaminationOtherPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'What other measures are being taken to reduce the spread of TB during housing?'
const questionKey = 'buildingsHowMinimiseContaminationOther'
const pageUrl = '/biosecurity/buildings-how-minimise-contamination-other'

describe('BuildingsHowMinimiseContaminationOtherPage', () => {
  const page = new BuildingsHowMinimiseContaminationOtherPage()

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

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(BuildingsHowMinimiseContaminationOtherAnswer)
  })

  it('nextPage should return the people disinfection page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('should export page', () => {
    expect(
      buildingsHowMinimiseContaminationOtherPage
    ).toBeInstanceOf(BuildingsHowMinimiseContaminationOtherPage)
  })

  describePageSnapshot({
    describes: 'buildingsHowMinimiseContaminationOtherPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
