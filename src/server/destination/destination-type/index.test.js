import {
  destinationType,
  destinationTypePage,
  DestinationTypePage
} from './index.js'
import { DestinationTypeAnswer } from '../../common/model/answer/destination-type/destination-type.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationSummaryPage } from '../summary/index.js'
import { anotherDestinationPage } from '../another-destination/index.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const sectionKey = 'destination'
const question = 'Where are the animals going to?'
const questionKey = 'destinationType'
const view = 'destination/destination-type/index'
const pageUrl = '/destination/type-of-destination'

describe('DestinationTypePage', () => {
  let page

  beforeEach(() => {
    page = new DestinationTypePage()
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
    expect(page.Answer).toBe(DestinationTypeAnswer)
  })

  describe('nextPage', () => {
    it('nextPage should return general licence page when answer is "slaughter"', () => {
      const answer = { value: 'slaughter' }
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBe(destinationGeneralLicencePage)
    })

    it('nextPage should return exit page when answer is "dedicated-sale"', () => {
      const answer = { value: 'dedicated-sale' }
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBe(destinationSummaryPage)
    })

    it('nextPage should return exitPage when answer is "afu"', () => {
      const answer = { value: 'afu' }
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBe(destinationSummaryPage)
    })

    it('nextPage should return exitPage when answer is "other"', () => {
      const answer = { value: 'other' }
      const nextPage = page.nextPage(answer)
      expect(nextPage).toBe(anotherDestinationPage)
    })
  })

  it('should export page', () => {
    expect(destinationTypePage).toBeInstanceOf(DestinationTypePage)
  })

  it('should export emailAddress as a plugin', () => {
    expect(destinationType).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      destinationType.plugin
    )
    expect(plugin).toHaveProperty('name')
    expect(plugin.name).toBe(`${sectionKey}-${questionKey}`)
    expect(plugin).toHaveProperty('register')
  })

  describePageSnapshot({
    description: 'DestinationTypePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/** @import { PluginBase, PluginNameVersion, Server } from '@hapi/hapi' */
