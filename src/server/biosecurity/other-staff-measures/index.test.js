import { OtherStaffMeasuresAnswer } from '../../common/model/answer/other-staff-measures/other-staff-measures.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { badgersPage } from '../badgers/index.js'
import { otherStaffMeasuresPage, OtherStaffMeasuresPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'What other measures are staff taking to reduce the risk of spreading TB?'
const questionKey = 'otherStaffMeasures'
const pageUrl = '/biosecurity/other-staff-measures'

describe('OtherStaffMeasures', () => {
  const page = new OtherStaffMeasuresPage()

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
    expect(page.Answer).toBe(OtherStaffMeasuresAnswer)
  })

  it('nextPage should return badgers page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(badgersPage)
  })

  it('should export page', () => {
    expect(otherStaffMeasuresPage).toBeInstanceOf(OtherStaffMeasuresPage)
  })

  describePageSnapshot({
    describes: 'otherStaffMeasures.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
