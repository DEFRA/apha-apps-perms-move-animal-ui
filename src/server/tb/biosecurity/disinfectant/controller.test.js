import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import SessionTester from '~/src/server/common/test-helpers/session-helper.js'
import { QuestionPage } from '~/src/server/common/model/page/question-page-model.js'
import { DisinfectantPageController } from './controller.js'
import { validBiosecuritySectionState } from '~/src/server/common/test-helpers/journey-state.js'
import { DilutionRateAnswer } from '~/src/server/common/model/answer/dilution-rate/dilution-rate.js'

/** @import { Server } from '@hapi/hapi' */

const pageUrl = '/test/basic-page'

class TestPage extends QuestionPage {
  urlPath = pageUrl
  Answer = DilutionRateAnswer
}

const controller = new DisinfectantPageController(new TestPage())

describe('PageController', () => {
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

  it('should clear disinfectant dilution answer if disinfectant changed', async () => {
    await session.setSectionState('biosecurity', validBiosecuritySectionState)

    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: pageUrl
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    const state = await session.getSectionState('biosecurity')
    expect(state.dilutionRate).toBeUndefined()
  })

  it('should leave the disinfectant dilution answer unchanged if disinfectant stays the same', async () => {
    await session.setSectionState('biosecurity', validBiosecuritySectionState)

    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: pageUrl,
          payload: {
            disinfectant: validBiosecuritySectionState.disinfectant
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    const state = await session.getSectionState('biosecurity')
    expect(state.dilutionRate).toBe(validBiosecuritySectionState.dilutionRate)
  })
})
