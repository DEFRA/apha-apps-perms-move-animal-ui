import { EquipmentHowMinimiseContaminationAnswer } from '../../../common/model/answer/equipment-how-minimise-contamination/equipment-how-minimise-contamination.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { otherEquipmentMeasuresPage } from '../other-equipment-measures/index.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  equipmentHowMinimiseContaminationPage,
  EquipmentHowMinimiseContaminationPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Which measures are in place to clean and disinfect equipment to reduce the risk of spreading TB?'
const questionKey = 'equipmentHowMinimiseContamination'
const pageUrl = '/biosecurity/equipment-how-minimise-contamination'

describe('EquipmentHowMinimiseContaminationPage', () => {
  const page = new EquipmentHowMinimiseContaminationPage()

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
    expect(page.Answer).toBe(EquipmentHowMinimiseContaminationAnswer)
  })

  it('nextPage should return people disinfection page when the answer does not include "other"', () => {
    const answer = new EquipmentHowMinimiseContaminationAnswer({
      equipmentHowMinimiseContamination: ['designatedDisinfectionPoints']
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('nextPage should return other equipment measures page when the answer includes "other"', () => {
    const answer = new EquipmentHowMinimiseContaminationAnswer({
      equipmentHowMinimiseContamination: [
        'designatedDisinfectionPoints',
        'other'
      ]
    })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(otherEquipmentMeasuresPage)
  })

  it('should export page', () => {
    expect(equipmentHowMinimiseContaminationPage).toBeInstanceOf(
      EquipmentHowMinimiseContaminationPage
    )
  })

  describePageSnapshot({
    describes: 'equipmentHowMinimiseContaminationPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
