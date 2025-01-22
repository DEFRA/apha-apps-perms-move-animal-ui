import { sendNotification } from './notify.js'
import { proxyFetch } from '~/src/server/common/helpers/proxy.js'
import { config } from '~/src/config/config.js'

// jest.mock('~/src/server/common/helpers/proxy.js', () => ({
//   proxyFetch: jest.fn()
// }))
// const mockProxyFetch = /** @type {jest.Mock} */ (proxyFetch)

jest.mock(
  '~/src/server/common/connectors/notify/notify-token-utils.js',
  () => ({
    createToken: jest.fn().mockReturnValue('mocked-jwt-token')
  })
)

const testData = { content: 'test' }

describe('sendNotification', () => {
  it('should send a notification successfully', async () => {
    const mockResponse = { ok: true }
    mockProxyFetch.mockImplementation(() => Promise.resolve(mockResponse))
    const response = await sendNotification(testData)

    const [url, options] = mockProxyFetch.mock.calls[0]

    expect(url).toBe(
      'https://api.notifications.service.gov.uk/v2/notifications/email'
    )

    expect(options.method).toBe('POST')
    expect(JSON.parse(options.body)).toEqual({
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
    mockProxyFetch.mockImplementation(() => Promise.resolve(mockResponse))

    await expect(sendNotification(testData)).rejects.toThrow(
      "HTTP failure from GOV.uk notify: status 400 with the following errors: Can't send to this recipient using a team-only API key, Can't send to this recipient when service is in trial mode"
    )
  })

  describe('timeout with steve', () => {
    it('should abort if timeout is hit', async () => {
      jest.useFakeTimers()

      global.fetch = jest.fn(
        () =>
          new Promise(() => {
            // testing
          })
      )

      const result = sendNotification(testData)

      jest.advanceTimersByTime(11000)

      await expect(result).rejects.toThrow(
        'Request to GOV.uk notify timed out after 10000ms'
      )
      jest.useRealTimers()
    })
  })
})
