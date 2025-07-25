import { howManyAnimalsPage, HowManyAnimalsPage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { HowManyAnimalsAnswer } from '../../../common/model/answer/how-many-animals/how-many-animals.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'
import { additionalInfoPage } from '../additional-info/index.js'
import { movementDatePage } from '../movement-date/index.js'

const sectionKey = 'destination'
const question = 'How many animals are you planning to move?'
const questionKey = 'howManyAnimals'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/how-many-animals'

describe('HowManyAnimalsPage', () => {
  let page

  beforeEach(() => {
    page = new HowManyAnimalsPage()
  })

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
    expect(page.Answer).toBe(HowManyAnimalsAnswer)
  })

  it('should return dateOfMovementPage when moving off the iso-unit to slaughter', () => {
    const nextPage = page.nextPage(null, {
      origin: { onOffFarm: 'off', originType: 'iso-unit' },
      destination: { destinationType: 'slaughter' }
    })
    expect(nextPage).toBe(movementDatePage)
  })

  it('should return additionalInfoPage when moving off the iso-unit to afu', () => {
    const nextPage = page.nextPage(null, {
      origin: { onOffFarm: 'off', originType: 'iso-unit' },
      destination: { destinationType: 'afu' }
    })
    expect(nextPage).toBe(additionalInfoPage)
  })

  it('nextPage should return address page as default', () => {
    const nextPage = page.nextPage(null, {})
    expect(nextPage).toBe(reasonForMovementPage)
  })

  it('should export page', () => {
    expect(howManyAnimalsPage).toBeInstanceOf(HowManyAnimalsPage)
  })

  describePageSnapshot({
    describes: 'HowManyAnimalsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
