import { createServer } from '~/src/server/index.js'
import SessionTester from '~/src/server/common/test-helpers/session-helper.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { TaskListController } from './task-list-controller.js'
import { ApplicationModel } from '../../model/application/application.js'
import { StateManager } from '../../model/state/state-manager.js'
import { OriginSection } from '~/src/server/tb/origin/section.js'
import { DestinationSection } from '~/src/server/tb/destination/section.js'
import {
  validDestinationSectionState,
  validOriginSectionState
} from '../../test-helpers/journey-state.js'
import { parseDocument } from '../../test-helpers/dom.js'

/** @import { Server } from '@hapi/hapi' */

const stateKey = 'test-state'

class TestApplicationModel extends ApplicationModel {
  static implementedSections = [OriginSection, DestinationSection]
}

class TestStateManager extends StateManager {
  get key() {
    return stateKey
  }
}

class TestTaskListController extends TaskListController {
  ApplicationModel = TestApplicationModel
  StateManager = TestStateManager
  pageTitleAndHeading = 'Test page heading'
  buttonText = 'Review your application and submit'
  urlPath = '/test/task-list'
  submitUrlPath = '/test/submit'
}

const controller = new TestTaskListController()

describe('TaskListController', () => {
  /** @type {Server} */
  let server

  /** @type {SessionTester} */
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.register(controller.plugin())
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should have a unique plugin name based on the class', () => {
    expect(controller.plugin().plugin.name).toBe(
      'task-list-TestTaskListController'
    )
  })

  it('should render an empty application (complete with "cannot start yet" sections)', async () => {
    await session.setState(stateKey, {})

    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: controller.urlPath
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)

    expect(statusCode).toBe(statusCodes.ok)
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
  })

  it('should render a partially complete application', async () => {
    await session.setState(stateKey, { origin: validOriginSectionState })

    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: controller.urlPath
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)

    expect(statusCode).toBe(statusCodes.ok)
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
  })

  it('should render a complete application', async () => {
    await session.setState(stateKey, {
      origin: validOriginSectionState,
      destination: validDestinationSectionState
    })

    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: controller.urlPath
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)

    expect(statusCode).toBe(statusCodes.ok)
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
  })


  it('should respond to a form submission by redirecting the user to the submit path', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: controller.urlPath
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(controller.submitUrlPath)
  })
})
