import { sendNotification } from './notify.js'
import { proxyFetch } from '../proxy.js'
import { config } from '~/src/config/config.js'

jest.mock('../proxy.js', () => ({
  proxyFetch: jest.fn()
}))
const mockProxyFetch = /** @type {jest.Mock} */ (proxyFetch)

jest.mock('../token/token-utils.js', () => ({
  createToken: jest.fn().mockReturnValue('mocked-jwt-token')
}))

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
    const mockResponse = { ok: false }
    mockProxyFetch.mockImplementation(() => Promise.resolve(mockResponse))

    await expect(sendNotification(testData)).rejects.toThrow()
  })
})
