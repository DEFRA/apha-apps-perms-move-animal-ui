import { checkStatus, initiateFileUpload } from './cdp-uploader.js'
import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { spyOnConfig } from '../../test-helpers/config.js'

/**
 * @import { IncomingMessage } from 'node:http'
 */

jest.mock('@hapi/wreck')

const maxFileSize = 10000000

const mockUploaderUrl = 'http://mock-uploader-url'
const mockBucket = 'mock-bucket'
const mockPath = 'mock-path'
const mockRedirectUrl = 'http://mock-redirect-url'
const mockUploadId = 'test-upload-id'
const mockUploadUrl = 'test-upload-url'
const mockStatusUrl = 'test-status-url'

const mockUploadConfig = {
  bucket: mockBucket,
  uploaderUrl: mockUploaderUrl,
  path: mockPath
}

describe('initiateFileUpload', () => {
  beforeEach(() => {
    jest.spyOn(config, 'get').mockImplementation((key) => {
      if (key === 'fileUpload') {
        return mockUploadConfig
      }
      if (key === 'featureFlags') {
        return { pdfUpload: false }
      } else {
        return config.get.bind(config)
      }
    })
  })

  afterEach(jest.restoreAllMocks)

  it('should call Wreck.post with the correct payload and URL', async () => {
    const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 200
      }),
      payload: JSON.stringify({
        uploadId: mockUploadId,
        uploadUrl: mockUploadUrl,
        statusUrl: mockStatusUrl
      })
    })

    await initiateFileUpload(mockRedirectUrl)

    expect(wreckSpy).toHaveBeenCalledWith(`${mockUploaderUrl}/initiate`, {
      payload: JSON.stringify({
        redirect: mockRedirectUrl,
        s3Bucket: mockBucket,
        s3Path: mockPath,
        mimeTypes: ['image/png', 'image/jpeg'],
        maxFileSize
      })
    })
  })

  it('should throw an error if Wreck.post fails', async () => {
    const mockError = new Error('post failed')

    jest.spyOn(Wreck, 'post').mockRejectedValue(mockError)

    await expect(initiateFileUpload(mockRedirectUrl)).rejects.toThrow(
      'post failed'
    )
  })

  describe('when pdfUpload feature flag is enabled', () => {
    it('should include application/pdf in mimeTypes if pdfUpload feature flag is enabled', async () => {
      jest.spyOn(config, 'get').mockImplementation((key) => {
        if (key === 'fileUpload') {
          return mockUploadConfig
        }
        if (key === 'featureFlags') {
          return { pdfUpload: true }
        } else {
          return config.get.bind(config)
        }
      })

      const wreckSpy = jest.spyOn(Wreck, 'post').mockResolvedValue({
        res: /** @type {IncomingMessage} */ ({
          statusCode: 200
        }),
        payload: JSON.stringify({
          uploadId: mockUploadId,
          uploadUrl: mockUploadUrl,
          statusUrl: mockStatusUrl
        })
      })

      await initiateFileUpload(mockRedirectUrl)

      expect(wreckSpy).toHaveBeenCalledWith(`${mockUploaderUrl}/initiate`, {
        payload: JSON.stringify({
          redirect: mockRedirectUrl,
          s3Bucket: mockBucket,
          s3Path: mockPath,
          mimeTypes: ['image/png', 'image/jpeg', 'application/pdf'],
          maxFileSize
        })
      })
    })
  })
})

describe('checkStatus', () => {
  beforeEach(() => {
    spyOnConfig('fileUpload', mockUploadConfig)
  })

  afterEach(jest.restoreAllMocks)

  it('should call Wreck.get with the correct URL', async () => {
    const wreckSpy = jest.spyOn(Wreck, 'get').mockResolvedValue({
      res: /** @type {IncomingMessage} */ ({
        statusCode: 200
      }),
      payload: JSON.stringify({ status: 'success' })
    })

    await checkStatus(mockUploadId)

    expect(wreckSpy).toHaveBeenCalledWith(
      `${mockUploaderUrl}/status/${mockUploadId}`
    )
  })

  it('should throw an error if Wreck.get fails', async () => {
    const mockError = new Error('get failed')

    jest.spyOn(Wreck, 'get').mockRejectedValue(mockError)

    await expect(checkStatus(mockUploadId)).rejects.toThrow('get failed')
  })
})
