import { NOTIFY_URL, sendNotification } from './notify.js'
import * as proxyFetchObject from '~/src/server/common/helpers/proxy.js'
import { config } from '~/src/config/config.js'

const testData = { content: 'test' }

jest.mock(
  '~/src/server/common/connectors/notify/notify-token-utils.js',
  () => ({
    createToken: jest.fn().mockReturnValue('mocked-jwt-token')
  })
)

describe('sendNotification', () => {
  describe('with mocked proxyFetch', () => {
    it('should send a notification successfully', async () => {
      const mockResponse = { ok: true }
      const mockProxyFetch = jest
        .spyOn(proxyFetchObject, 'proxyFetch')
        .mockImplementation(() => Promise.resolve(mockResponse))

      const response = await sendNotification(testData)

      const [url, options] = mockProxyFetch.mock.calls[0]
      /**
       * @type {string | undefined}
       */
      // @ts-expect-error: options.body might note be a string
      const body = options.body

      expect(url).toBe(NOTIFY_URL)

      expect(options.method).toBe('POST')
      expect(JSON.parse(body ?? '')).toEqual({
        personalisation: testData,
        template_id: config.get('notify').templateId,
        email_address: config.get('notify').caseDeliveryEmailAddress
      })
      expect(options.headers).toEqual({
        Authorization: 'Bearer mocked-jwt-token'
      })

      expect(response).toEqual(mockResponse)
    })

    it('should throw an error if the response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 400,

        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => ({
          status_code: 400,
          errors: [
            {
              error: 'BadRequestError',
              message: "Can't send to this recipient using a team-only API key"
            },
            {
              error: 'BadRequestError',
              message:
                "Can't send to this recipient when service is in trial mode"
            }
          ]
        })
      }
      jest
        .spyOn(proxyFetchObject, 'proxyFetch')
        .mockImplementation(() => Promise.resolve(mockResponse))

      await expect(sendNotification(testData)).rejects.toThrow(
        "HTTP failure from GOV.uk notify: status 400 with the following errors: Can't send to this recipient using a team-only API key, Can't send to this recipient when service is in trial mode"
      )
    })
  })

  describe('without mocked proxyFetch', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })

    it('should call proxyFetch passing the correct timeout', async () => {
      const expectedTimeout = 10000
      const fetchSpy = jest.spyOn(proxyFetchObject, 'proxyFetch')
      const abortSignalTimeoutSpy = jest.spyOn(global.AbortSignal, 'timeout')

      try {
        await sendNotification(testData)
      } catch (e) {
        // ignore error
      } finally {
        expect(abortSignalTimeoutSpy).toHaveBeenCalledWith(expectedTimeout)

        const mockSignal = abortSignalTimeoutSpy.mock.results[0].value
        expect(fetchSpy).toHaveBeenCalledWith(
          NOTIFY_URL,
          expect.objectContaining({
            signal: mockSignal
          })
        )
      }
    })

    it('should abort if timeout is hit', async () => {
      const notifyConfig = config.get('notify')
      config.set('notify', {
        ...notifyConfig,
        timeout: 0
      })

      const result = sendNotification(testData)

      await expect(result).rejects.toThrow(
        'Request to GOV.uk notify timed out after 0ms'
      )
    })
  })
})
