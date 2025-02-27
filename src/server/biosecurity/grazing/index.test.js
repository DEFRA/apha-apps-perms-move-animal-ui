import { GrazingAnswer } from '../../common/model/answer/grazing/grazing.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { roadsAndTracksPage } from '../roads-and-tracks/index.js'
import { lastGrazedPage } from '../last-grazed/index.js'
import { grazingPage, GrazingPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'Will the incoming cattle be grazed?'
const questionKey = 'grazing'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/grazing'

describe('GrazingPage', () => {
  const page = new GrazingPage()

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
    expect(page.Answer).toBe(GrazingAnswer)
  })

  it('nextPage should return last-grazed when answer is "yes"', () => {
    const answer = new GrazingAnswer({ grazing: 'yes' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(lastGrazedPage)
  })

  it('nextPage should return roads-and-tracks page when answer is "no"', () => {
    const answer = new GrazingAnswer({ grazing: 'no' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(roadsAndTracksPage)
  })

  it('nextPage should return roads-and-tracks page when answer is "I dont know"', () => {
    const answer = new GrazingAnswer({ grazing: 'unknown' })
    const nextPage = page.nextPage(answer)
    expect(nextPage).toBe(roadsAndTracksPage)
  })

  it('should export page', () => {
    expect(grazingPage).toBeInstanceOf(GrazingPage)
  })

  describePageSnapshot({
    describes: 'grazingPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/**
 * @import { RadioButtonAnswer } from '../../common/model/answer/radio-button/radio-button.js'
 */
