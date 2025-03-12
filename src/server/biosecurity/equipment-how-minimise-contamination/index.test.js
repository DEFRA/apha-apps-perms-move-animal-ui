import { EquipmentHowMinimiseContaminationAnswer } from '../../common/model/answer/equipment-how-minimise-contamination/equipment-how-minimise-contamination.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import {
  equipmentHowMinimiseContaminationPage,
  EquipmentHowMinimiseContaminationPage
} from './index.js'

const sectionKey = 'biosecurity'
const question =
  'How will you minimise the risk of spread of TB infection to the incoming cattle when using shared equipment?'
const questionKey = 'equipmentHowMinimiseContamination'
const view = 'biosecurity/equipment-how-minimise-contamination/index'
const pageUrl = '/biosecurity/equipment-how-minimise-contamination'
const customHeading = 'Shared equipment'

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
    expect(page.Answer).toBe(EquipmentHowMinimiseContaminationAnswer)
  })

  it('nextPage should return any shared equipment page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(peopleDisinfectionPage)
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
