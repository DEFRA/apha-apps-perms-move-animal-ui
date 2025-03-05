import { maxNumberOfAnimalsPage, MaxNumberOfAnimalsPage } from './index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { MaxNumberOfAnimalsAnswer } from '../../common/model/answer/max-number-of-animals/max-number-of-animals.js'
import { reasonForMovementPage } from '../reason-for-movement/index.js'

const sectionKey = 'destination'
const question = 'Enter the maximum number of animals you are planning to move'
const questionKey = 'maxNumberOfAnimals'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/destination/how-many-animals'

describe('MaxNumberOfAnimalsPage', () => {
  let page

  beforeEach(() => {
    page = new MaxNumberOfAnimalsPage()
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
    expect(page.Answer).toBe(MaxNumberOfAnimalsAnswer)
  })

  it('nextPage should return address page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(reasonForMovementPage)
  })

  it('should export page', () => {
    expect(maxNumberOfAnimalsPage).toBeInstanceOf(MaxNumberOfAnimalsPage)
  })

  describePageSnapshot({
    describes: 'MaxNumberOfAnimalsPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
