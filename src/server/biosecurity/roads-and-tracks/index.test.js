import { RoadsAndTracksAnswer } from '../../common/model/answer/roads-and-tracks/roads-and-tracks.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import { roadsAndTracksPage, RoadsAndTracksPage } from './index.js'

const sectionKey = 'biosecurity'
const question =
  'Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?'
const questionKey = 'roadsAndTracks'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/biosecurity/roads-and-tracks'

describe('RoadsAndTracksPage', () => {
  const page = new RoadsAndTracksPage()

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
    expect(page.Answer).toBe(RoadsAndTracksAnswer)
  })

  it('nextPage should return any buildings shared page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(buildingsAnySharedPage)
  })

  it('should export page', () => {
    expect(roadsAndTracksPage).toBeInstanceOf(RoadsAndTracksPage)
  })

  describePageSnapshot({
    describes: 'roadsAndTracksPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion } from '@hapi/hapi' */
