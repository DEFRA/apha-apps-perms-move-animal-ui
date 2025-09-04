import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { Answer, slaughtermanNamePage } from './index.js'
import { SlaughterStubPage } from '../slaughter-stub/index.js'

const sectionKey = 'slaughter'
const questionKey = 'slaughtermanName'
const pageUrl = '/fmd/slaughter-information/name'
const page = slaughtermanNamePage
const question = 'What is the name of the Slaughterman?'

describe('Answer', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })
})

describe('SlaughtermanNamePage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(Answer)
  })

  describe('nextPage', () => {
    it('should return SlaughterStubPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(SlaughterStubPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
