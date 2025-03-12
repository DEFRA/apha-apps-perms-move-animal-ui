import {
  howManyAnimalsMaximumPage,
  HowManyAnimalsMaximumPage
} from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'
import { HowManyAnimalsMaximumAnswer } from '../../common/model/answer/how-many-animals-maximum/how-many-animals-maximum.js'

const sectionKey = 'destination'
const question =
  'What is the maximum number of animals you are planning to move?'
const questionKey = 'howManyAnimalsMaximum'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/how-many-animals-maximum'

describe('HowManyAnimalsMaximumPage', () => {
  let page

  beforeEach(() => {
    page = new HowManyAnimalsMaximumPage()
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
    expect(page.Answer).toBe(HowManyAnimalsMaximumAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(reasonForMovementPage)
  })

  it('should export page', () => {
    expect(howManyAnimalsMaximumPage).toBeInstanceOf(HowManyAnimalsMaximumPage)
  })

  describePageSnapshot({
    describes: 'HowManyAnimalsMaximumPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
