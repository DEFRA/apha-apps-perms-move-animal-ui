import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'

import { findMatchingCphs } from './index.js'

describe('Integration bridge API', () => {
  const CONFIG_VALUES = {
    baseUrl: 'http://integration-bridge',
    tokenUrl: 'http://integration-bridge/oauth2/token',
    clientId: 'client-id',
    clientSecret: 'client-secret',
    timeout: 5000
  }

  const MOCK_TOKEN = 'abc123'
  const TEST_CPHS = ['12/345/6789', '98/765/4321']

  const originalConfigGet = config.get.bind(config)

  /**
   * @param {number} statusCode
   * @param {any} payload
   */
  const createMockResponse = (statusCode, payload) =>
    /** @type {any} */ ({
      res: { statusCode },
      payload: JSON.stringify(payload)
    })

  /**
   * @param {string} [accessToken]
   */
  const mockTokenResponse = (accessToken = MOCK_TOKEN) =>
    createMockResponse(200, { access_token: accessToken })

  /**
   * @param {any} data
   */
  const mockHoldingsResponse = (data) => createMockResponse(200, { data })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(config, 'get').mockImplementation((name) => {
      if (name === 'integrationBridge') {
        return CONFIG_VALUES
      }
      return originalConfigGet(name)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('successful scenarios', () => {
    it('should request a token and return matching CPHs', async () => {
      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(mockTokenResponse())
        .mockResolvedValueOnce(mockHoldingsResponse([{ id: TEST_CPHS[0] }]))

      const result = await findMatchingCphs(TEST_CPHS)

      expect(Wreck.post).toHaveBeenNthCalledWith(1, CONFIG_VALUES.tokenUrl, {
        payload:
          'grant_type=client_credentials&client_id=client-id&client_secret=client-secret',
        headers: {
          Authorization: 'Basic Y2xpZW50LWlkOmNsaWVudC1zZWNyZXQ=',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: CONFIG_VALUES.timeout
      })

      expect(Wreck.post).toHaveBeenNthCalledWith(
        2,
        `${CONFIG_VALUES.baseUrl}/holdings/find`,
        {
          payload: JSON.stringify({ ids: TEST_CPHS }),
          headers: {
            Authorization: `Bearer ${MOCK_TOKEN}`,
            'Content-Type': 'application/json'
          },
          timeout: CONFIG_VALUES.timeout
        }
      )

      expect(result).toEqual(new Set([TEST_CPHS[0]]))
    })

    it('should filter out holdings with non-string IDs', async () => {
      const mixedData = [
        { id: TEST_CPHS[0] },
        { id: null },
        { id: 123 },
        {},
        { id: TEST_CPHS[1] }
      ]

      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(mockTokenResponse())
        .mockResolvedValueOnce(mockHoldingsResponse(mixedData))

      const result = await findMatchingCphs(TEST_CPHS)

      expect(result).toEqual(new Set(TEST_CPHS))
    })
  })

  describe('error scenarios - token request', () => {
    it('should reject when the token request fails', async () => {
      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(createMockResponse(503, ''))

      await expect(findMatchingCphs([TEST_CPHS[0]])).rejects.toThrow(TypeError)
    })

    it('should reject when access token is missing from response', async () => {
      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(createMockResponse(200, {}))

      await expect(findMatchingCphs([TEST_CPHS[0]])).rejects.toThrow(
        'Integration bridge token response did not include an access token'
      )
    })

    it('should handle missing statusCode', async () => {
      jest.spyOn(Wreck, 'post').mockResolvedValueOnce(
        /** @type {any} */ ({
          res: {},
          payload: JSON.stringify({})
        })
      )

      await expect(findMatchingCphs([TEST_CPHS[0]])).rejects.toThrow(
        'Integration bridge token response did not include an access token'
      )
    })
  })

  describe('error scenarios - holdings response', () => {
    it('should reject when holdings response data is not an array', async () => {
      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(mockTokenResponse())
        .mockResolvedValueOnce(createMockResponse(200, { data: 'invalid' }))

      await expect(findMatchingCphs([TEST_CPHS[0]])).rejects.toThrow(
        'Integration bridge holdings response is invalid'
      )
    })

    it('should reject when holdings response data is missing', async () => {
      jest
        .spyOn(Wreck, 'post')
        .mockResolvedValueOnce(mockTokenResponse())
        .mockResolvedValueOnce(createMockResponse(200, {}))

      await expect(findMatchingCphs([TEST_CPHS[0]])).rejects.toThrow(
        'Integration bridge holdings response is invalid'
      )
    })
  })
})
