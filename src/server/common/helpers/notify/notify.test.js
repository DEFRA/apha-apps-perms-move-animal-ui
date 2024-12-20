import { sendNotification } from './notify.js'
import { proxyFetch } from '../proxy.js'

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

    expect(proxyFetch).toHaveBeenCalledWith(
      'https://api.notifications.service.gov.uk/v2/notifications/email',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining(JSON.stringify(testData)),
        headers: expect.objectContaining({
          Authorization: 'Bearer mocked-jwt-token'
        })
      })
    )
    expect(response).toEqual(mockResponse)
  })

  it('should throw an error if the response is not ok', async () => {
    const mockResponse = { ok: false }
    mockProxyFetch.mockImplementation(() => Promise.resolve(mockResponse))

    await expect(sendNotification(testData)).rejects.toThrow()
  })
})
