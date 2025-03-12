import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { equipmentAnySharedPage, EquipmentAnySharedPage } from './index.js'
import { EquipmentAnySharedAnswer } from '../../common/model/answer/equipment-any-shared/equipment-any-shared.js'
import { peopleDisinfectionPage } from '../people-disinfection/index.js'
import { equipmentHowMinimiseContaminationPage } from '../how-minimise-contamination/index.js'

const sectionKey = 'biosecurity'
const question =
  'Will the incoming cattle share any equipment and machinery with the resident herd?'
const questionKey = 'equipmentShared'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/equipment-any-shared'

describe('EquipmentAnySharedPage', () => {
  const page = new EquipmentAnySharedPage()

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
    expect(page.Answer).toBe(EquipmentAnySharedAnswer)
  })

  it('nextPage should return how to minimise contamination page when answer is "yes"', () => {
    const answer = new EquipmentAnySharedAnswer({ equipmentShared: 'yes' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(equipmentHowMinimiseContaminationPage)
  })

  it('nextPage should return people disinfection page when answer is "no"', () => {
    const answer = new EquipmentAnySharedAnswer({ equipmentShared: 'no' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(peopleDisinfectionPage)
  })

  it('should export page', () => {
    expect(equipmentAnySharedPage).toBeInstanceOf(EquipmentAnySharedPage)
  })

  describePageSnapshot({
    describes: 'equipmentAnySharedPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
