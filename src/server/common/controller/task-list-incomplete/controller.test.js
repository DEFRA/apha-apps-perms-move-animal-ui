import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { describePageSnapshot } from '../../test-helpers/snapshot-page.js'

const pageUrl = '/tb/task-list-incomplete'

describe('#taskListIncompleteController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: pageUrl
    })

    expect(parseDocument(payload).title).toBe(
      'You need to complete all of the sections before you review and submit'
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  describePageSnapshot({
    describes: 'buildingsHowMinimiseContaminationPage.content',
    it: 'should render expected response and content',
    pageUrl
  })

  describePageSnapshot({
    describes: 'buildingsHowMinimiseContaminationPage.content.welsh',
    it: 'should render expected response and content',
    pageUrl: `${pageUrl}?lang=cy`
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
