import { howManyAnimalsPage, HowManyAnimalsPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { HowManyAnimalsAnswer } from '../../common/model/answer/max-number-of-animals/max-number-of-animals.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'

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

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
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
