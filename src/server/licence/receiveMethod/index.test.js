import { receiveMethod, receiveMethodPage, ReceiveMethodPage } from './index.js'
import { ReceiveMethodAnswer } from '../../common/model/answer/receiveMethod/receiveMethod.js'
import { emailAddressPage } from '../email-address/index.js'
import { postExitPage } from '../postExitPage/index.js'
import { createServer } from '~/src/server/index.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '../../common/test-helpers/csrf.js'

// TODO: import next page object

const sectionKey = 'licence'
const question = 'How would you like this licence sent to you?'
const questionKey = 'receiveMethod'
const view = 'licence/receiveMethod/index'
const pageUrl = '/receiving-the-licence/licence-email-or-post'

describe('ReceiveMethodPage', () => {
  let page

  beforeEach(() => {
    page = new ReceiveMethodPage()
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
    expect(page.Answer).toBe(ReceiveMethodAnswer)
  })

  it('nextPage should correct next page', () => {
    const nextPage = page.nextPage({
      value: 'email'
    })

    expect(nextPage).toBe(emailAddressPage)
  })

  it('nextPage should correct exit page', () => {
    const nextPage = page.nextPage({
      value: 'post'
    })

    expect(nextPage).toBe(postExitPage)
  })

  it('should export page', () => {
    expect(receiveMethodPage).toBeInstanceOf(ReceiveMethodPage)
  })

  it('should export ReceiveMethod as a plugin', () => {
    expect(receiveMethod).toHaveProperty('plugin')
    const plugin = /** @type {PluginBase<void> & PluginNameVersion} */ (
      receiveMethod.plugin
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
