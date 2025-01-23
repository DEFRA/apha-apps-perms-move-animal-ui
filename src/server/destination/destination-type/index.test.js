import {
  destinationType,
  destinationTypePage,
  DestinationTypePage
} from './index.js'
import { DestinationTypeAnswer } from '../../common/model/answer/destination-type/destination-type.js'
import { destinationGeneralLicencePage } from '../general-licence/index.js'
import { destinationSummaryPage } from '../summary/index.js'
import { anotherDestinationPage } from '../another-destination/index.js'
import { createServer } from '~/src/server/index.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'

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

  describe('DestinationTypePage.content', () => {
    /** @type {Server} */
    let server

    beforeAll(async () => {
      server = await createServer()
      await server.initialize()
    })

    afterAll(async () => {
      await server.stop({ timeout: 0 })
    })

    it('should render expected response and content', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'GET',
          url: pageUrl
        })
      )

      const document = parseDocument(payload)
      expect(document.title).toBe(question)
      expect(statusCode).toBe(statusCodes.ok)

      const content = document.querySelector('#main-content')?.innerHTML
      expect(content).toMatchSnapshot()
    })
  })
})

/** @import { PluginBase, PluginNameVersion, Server } from '@hapi/hapi' */
