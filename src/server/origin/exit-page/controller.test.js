import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '../../common/test-helpers/dom.js'
import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const pageUrl = '/exit-page'

describe('#exitPageController', () => {
  const pageTitleAndHeading =
    'This service is not available for your movement type'
  const govukTB204Link =
    'https://www.gov.uk/government/publications/tb-restricted-cattle-application-for-movement-licence-in-england'

  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: pageUrl
    })

    const document = parseDocument(payload)

    expect(document.querySelector('h1')?.innerHTML).toEqual(pageTitleAndHeading)
    expect(document.title).toBe(pageTitleAndHeading)

    expect(
      document.querySelector(`[href='${govukTB204Link}']`)?.innerHTML.trim()
    ).toBe('submit the current application form on GOV.UK')
    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('#originExitPage.content', () => {
    describePageSnapshot({
      describes: 'licenceSummaryPage.content',
      it: 'should render expected response and content',
      pageUrl
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
