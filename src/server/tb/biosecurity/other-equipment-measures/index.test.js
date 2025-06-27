import { OtherEquipmentMeasuresAnswer } from '../../../common/model/answer/other-equipment-measures/other-equipment-measures.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  otherEquipmentMeasuresPage,
  OtherEquipmentMeasuresPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'What other measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'
const questionKey = 'otherEquipmentMeasures'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/other-equipment-measures'

describe('OtherEquipmentMeasures', () => {
  const page = new OtherEquipmentMeasuresPage()

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
    expect(page.Answer).toBe(OtherEquipmentMeasuresAnswer)
  })

  it('nextPage should return grazing field how separate page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('should export page', () => {
    expect(otherEquipmentMeasuresPage).toBeInstanceOf(
      OtherEquipmentMeasuresPage
    )
  })

  describePageSnapshot({
    describes: 'otherEquipmentMeasures.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
