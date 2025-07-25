import { receiveMethodPage } from '../receiveMethod/index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { fullNameFuturePage, FullNameFuturePage } from './index.js'
import { FullNameFutureAnswer } from '../../../common/model/answer/full-name-future/full-name-future.js'

const sectionKey = 'licence'
const question = 'Who will be the registered owner of the animals?'
const questionKey = 'fullName'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/licence-name-future'

describe('FullNameFuturePage', () => {
  let page

  beforeEach(() => {
    page = new FullNameFuturePage()
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
    expect(page.Answer).toBe(FullNameFutureAnswer)
  })

  it('nextPage should return correct next page', () => {
    const nextPage = page.nextPage()

    expect(nextPage).toBe(receiveMethodPage)
  })

  it('should export page', () => {
    expect(fullNameFuturePage).toBeInstanceOf(FullNameFuturePage)
  })

  describePageSnapshot({
    describes: 'FullNameFuturePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
