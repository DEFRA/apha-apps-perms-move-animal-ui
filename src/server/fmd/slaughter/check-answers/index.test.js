import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { SlaughterInformationSection } from '../section.js'
import { CheckAnswersPage } from './index.js'
import { createServer } from '~/src/server/index.js'

/** @import { Server } from '@hapi/hapi' */

const pageTitleAndHeading =
  'Check your answers before you continue your application'

describe('CheckAnswersPage', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  const page = new CheckAnswersPage()

  it('should have the expected page title and heading', () => {
    expect(page.pageTitle).toBe(pageTitleAndHeading)
    expect(page.pageHeading).toBe(pageTitleAndHeading)
  })

  it('should have the expected section key', () => {
    expect(page.sectionKey).toBe('slaughterInformation')
  })

  it('should have the expected page url path', () => {
    expect(page.urlPath).toBe('/fmd/slaughter-information/check-answers')
  })

  it('should return the right section', () => {
    expect(page.sectionFactory({})).toBeInstanceOf(SlaughterInformationSection)
  })

  it('should have a url key of', () => {
    expect(page.urlKey).toBe('fmd/slaughter-information')
  })

  it('should have been registered as a route', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: page.urlPath
    })

    expect(statusCode).not.toBe(statusCodes.notFound)
  })
})
