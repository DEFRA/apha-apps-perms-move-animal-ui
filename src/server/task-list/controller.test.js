import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { withCsrfProtection } from '../common/test-helpers/csrf.js'
import SessionTester from '../common/test-helpers/session-helper.js'
import { validApplicationState } from '../common/test-helpers/journey-state.js'

const getTaskTitles = (document) =>
  Array.from(document.querySelectorAll('.govuk-task-list__name-and-hint')).map(
    (el) => el.textContent?.trim()
  )

describe('#taskListController', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
    const {
      origin,
      destination,
      licence,
      identification,
      biosecurity,
      'biosecurity-map': biosecurityMap
    } = validApplicationState
    await session.setSectionState('origin', origin)
    await session.setSectionState('destination', destination)
    await session.setSectionState('licence', licence)
    await session.setSectionState('identification', identification)
    await session.setSectionState('biosecurity', biosecurity)
    await session.setSectionState('biosecurity-map', biosecurityMap)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    expect(parseDocument(payload).title).toBe(
      'Your Bovine Tuberculosis (TB) movement licence application'
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should return the correct task list items when there is no state set', async () => {
    const { payload } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    const document = parseDocument(payload)
    const taskTitles = getTaskTitles(document)

    expect(taskTitles).toEqual([
      'Movement origin',
      'Movement destination',
      'Receiving the licence'
    ])
  })

  it('Should return the correct task list items when there is state enough to show all sections', async () => {
    const { payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    const taskTitles = getTaskTitles(document)

    expect(taskTitles).toEqual([
      'Movement origin',
      'Movement destination',
      'Receiving the licence',
      'Biosecurity details',
      'Biosecurity map'
    ])
  })

  it('Should redirect to check-answers', async () => {
    const { statusCode, headers } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/task-list'
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/submit/check-answers')
  })

  it('Should show completed sections', async () => {
    const { origin } = validApplicationState
    await session.setSectionState('origin', origin)

    const { statusCode, payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(expect.stringContaining(`Completed`))
  })

  it('should say that there are incomplete sections, and have a greyed out button', async () => {
    const { statusCode, payload } = await server.inject(
      withCsrfProtection({
        method: 'GET',
        url: '/task-list'
      })
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(expect.stringContaining(`3 out of 3`))
    expect(payload).toEqual(expect.stringContaining('govuk-button--secondary'))
  })

  it('should state all section complete, and have a green button', async () => {
    const { statusCode, payload } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/task-list'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(
      expect.stringContaining('You have completed all sections.')
    )
    expect(payload).not.toEqual(
      expect.stringContaining('govuk-button--secondary')
    )
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
