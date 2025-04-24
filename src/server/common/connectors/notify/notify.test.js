import { NOTIFY_URL, sendNotification } from './notify.js'
import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { statusCodes } from '../../constants/status-codes.js'

/**
 * @import { IncomingMessage } from 'node:http'
 */

const testData = {
  content: 'test',
  link_to_file: {
    file: 'base64encodedimage',
    filename: 'Biosecurity-map.jpg',
    confirm_email_before_download: true,
    retention_period: '1 week'
  }
}

const timeout = config.get('notify').timeout
const templateId = config.get('notify').templateId
const caseDeliveryEmailAddress = config.get('notify').caseDeliveryEmailAddress

jest.mock(
  '~/src/server/common/connectors/notify/notify-token-utils.js',
  () => ({
    createToken: jest.fn().mockReturnValue('mocked-jwt-token')
  })
)

describe('sendNotification', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('when the notification is sent successfully', () => {
    const mockResponse = {}
    let wreckSpy

    beforeEach(() => {
      wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: 200
        }),
        payload: JSON.stringify(mockResponse)
      })
    })

    it('should send a notification successfully', async () => {
      const response = await sendNotification(testData)

      const [url, options] = wreckSpy.mock.calls[0]
      const payload = options.payload

      expect(url).toBe(NOTIFY_URL)

      expect(JSON.parse(payload ?? '')).toEqual({
        personalisation: testData,
        template_id: templateId,
        email_address: caseDeliveryEmailAddress
      })
      expect(options?.headers).toEqual({
        Authorization: 'Bearer mocked-jwt-token'
      })
      expect(options?.timeout).toBe(timeout)
      expect(response).toEqual(mockResponse)
    })

    it('should substitute in an empty string if link_to_file is not provided', async () => {
      const testDataWithoutFile = { content: testData.content }

      const response = await sendNotification(testDataWithoutFile)

      const [url, options] = wreckSpy.mock.calls[0]
      const payload = options.payload

      expect(url).toBe(NOTIFY_URL)

      expect(JSON.parse(payload)).toEqual({
        personalisation: {
          ...testDataWithoutFile,
          link_to_file: ''
        },
        template_id: templateId,
        email_address: caseDeliveryEmailAddress
      })
      expect(options.headers).toEqual({
        Authorization: 'Bearer mocked-jwt-token'
      })
      expect(options?.timeout).toBe(timeout)
      expect(response).toEqual(mockResponse)
    })
  })

  describe('when the notification fails to send', () => {
    it('should throw an error if the request times out', async () => {
      jest.spyOn(Wreck, 'post').mockRejectedValue({
        output: {
          statusCode: statusCodes.gatewayTimeout
        }
      })

      await expect(sendNotification(testData)).rejects.toThrow(
        `Request to GOV.uk notify timed out after ${timeout}ms`
      )
    })

    it('should throw an error if we get an http level error', async () => {
      const errors = JSON.stringify({
        statusCode: statusCodes.badRequest,
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

      jest.spyOn(Wreck, 'post').mockRejectedValue({
        data: {
          payload: {
            toString: jest.fn().mockReturnValue(errors)
          }
        }
      })

      await expect(sendNotification(testData)).rejects.toThrow(
        `HTTP failure from GOV.uk notify: status ${statusCodes.badRequest} with the following errors: Can't send to this recipient using a team-only API key, Can't send to this recipient when service is in trial mode`
      )
    })

    it('should throw an error if we get a below-http level error', async () => {
      const errorMessage = 'any error'
      jest.spyOn(Wreck, 'post').mockRejectedValue({
        message: errorMessage
      })
      await expect(sendNotification(testData)).rejects.toThrow(
        `Request to GOV.uk notify failed with error: ${errorMessage}`
      )
    })
  })
})
