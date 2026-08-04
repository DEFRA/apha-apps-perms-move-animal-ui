import Wreck from '@hapi/wreck'

import { config } from '~/src/config/config.js'
import { runCphMatching } from './integration-bridge.js'

describe('Integration Bridge CPH matching', () => {
  const originalConfigGet = config.get.bind(config)

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(config, 'get').mockImplementation((name) => {
      if (name === 'integrationBridge') {
        return {
          baseUrl: 'http://integration-bridge',
          tokenUrl: 'http://integration-bridge/oauth2/token',
          clientId: 'client-id',
          clientSecret: 'client-secret',
          timeout: 5000
        }
      }
      return originalConfigGet(name)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should request a token and send holdings matches for the submitted CPHs', async () => {
    jest
      .spyOn(Wreck, 'post')
      .mockResolvedValueOnce(
        /** @type {any} */ ({
          res: { statusCode: 200 },
          payload: JSON.stringify({ access_token: 'abc123' })
        })
      )
      .mockResolvedValueOnce(
        /** @type {any} */ ({
          res: { statusCode: 200 },
          payload: JSON.stringify({ data: [{ id: '12/345/6789' }] })
        })
      )

    const logger = { info: jest.fn(), debug: jest.fn() }

    await runCphMatching({
      payload: {
        keyFacts: {
          originCph: '12/345/6789',
          destinationCph: '98/765/4321'
        }
      },
      applicationId: 'TB-1234-5678',
      logger
    })

    expect(Wreck.post).toHaveBeenNthCalledWith(
      1,
      'http://integration-bridge/oauth2/token',
      {
        payload:
          'grant_type=client_credentials&client_id=client-id&client_secret=client-secret',
        headers: {
          Authorization: 'Basic Y2xpZW50LWlkOmNsaWVudC1zZWNyZXQ=',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 5000
      }
    )

    expect(Wreck.post).toHaveBeenNthCalledWith(
      2,
      'http://integration-bridge/holdings/find',
      {
        payload: JSON.stringify({ ids: ['12/345/6789', '98/765/4321'] }),
        headers: {
          Authorization: 'Bearer abc123',
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    )

    expect(logger.info).toHaveBeenCalledWith('CPH match result', {
      cphMatch: {
        applicationCph: '12/345/6789',
        result: true,
        type: 'origin',
        applicationId: 'TB-1234-5678'
      }
    })
  })

  it('should log an error and continue when the CPH API is unavailable', async () => {
    jest.spyOn(Wreck, 'post').mockResolvedValueOnce(
      /** @type {any} */ ({
        res: { statusCode: 503 },
        payload: ''
      })
    )

    const logger = { info: jest.fn(), debug: jest.fn(), error: jest.fn() }

    await runCphMatching({
      payload: {
        keyFacts: {
          originCph: '12/345/6789'
        }
      },
      applicationId: 'TB-1234-5678',
      logger
    })

    expect(logger.error).toHaveBeenCalledWith('CPH API unavailable', {
      err: expect.any(Error),
      applicationId: 'TB-1234-5678'
    })
  })

  it('should skip matching when there are no CPHs to match', async () => {
    const wreckSpy = jest.spyOn(Wreck, 'post')

    const logger = { info: jest.fn(), debug: jest.fn() }

    await runCphMatching({
      payload: {},
      applicationId: 'TB-1234-5678',
      logger
    })

    expect(wreckSpy).not.toHaveBeenCalled()
  })

  it('should log an error when the token response is missing an access token', async () => {
    jest.spyOn(Wreck, 'post').mockResolvedValueOnce(
      /** @type {any} */ ({
        res: { statusCode: 200 },
        payload: JSON.stringify({})
      })
    )

    const logger = { info: jest.fn(), debug: jest.fn(), error: jest.fn() }

    await runCphMatching({
      payload: {
        keyFacts: {
          originCph: '12/345/6789'
        }
      },
      applicationId: 'TB-1234-5678',
      logger
    })

    expect(logger.error).toHaveBeenCalledWith('CPH API unavailable', {
      err: expect.any(TypeError),
      applicationId: 'TB-1234-5678'
    })
  })

  it('should log an error when the holdings response is invalid', async () => {
    jest
      .spyOn(Wreck, 'post')
      .mockResolvedValueOnce(
        /** @type {any} */ ({
          res: { statusCode: 200 },
          payload: JSON.stringify({ access_token: 'abc123' })
        })
      )
      .mockResolvedValueOnce(
        /** @type {any} */ ({
          res: { statusCode: 200 },
          payload: JSON.stringify({ somethingElse: true })
        })
      )

    const logger = { info: jest.fn(), debug: jest.fn(), error: jest.fn() }

    await runCphMatching({
      payload: {
        keyFacts: {
          originCph: '12/345/6789'
        }
      },
      applicationId: 'TB-1234-5678',
      logger
    })

    expect(logger.error).toHaveBeenCalledWith('CPH API unavailable', {
      err: expect.any(TypeError),
      applicationId: 'TB-1234-5678'
    })
  })
})
