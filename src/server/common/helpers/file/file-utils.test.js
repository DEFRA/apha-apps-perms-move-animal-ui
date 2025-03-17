import { handleUploadedFile } from './file-utils.js'
import { compressPdf } from './pdf-compression.js'
import { compress as compressImage } from './image-compression.js'
import { config } from '~/src/config/config.js'
import path from 'node:path'
import { createReadStream } from 'node:fs'

jest.mock('./pdf-compression.js')
jest.mock('./image-compression.js')
jest.mock('./size.js')
jest.mock('@aws-sdk/client-s3')
jest.mock('~/src/config/config.js')

const mockS3Object = {
  Body: createReadStream(
    path.resolve('./src/server/common/helpers/file/example-portrait.jpg')
  )
}

const pdfStream = createReadStream(
  path.resolve('./src/server/common/helpers/file/example.pdf')
)

const mockS3ObjectPdf = {
  Body: pdfStream,
  ContentType: 'application/pdf'
}

jest.mock('./pdf-compression.js', () => ({
  compressPdf: jest.fn().mockResolvedValue({
    file: Buffer.from('compressed-pdf'),
    duration: 100,
    reduction: 50
  })
}))
jest.mock('./image-compression.js', () => ({
  compress: jest.fn().mockResolvedValue({
    file: Buffer.from('compressed-image'),
    duration: 200,
    reduction: 30
  })
}))
jest.mock('./size.js', () => ({
  fileSizeInMB: jest.fn().mockReturnValue(1.5)
}))

const mockUploadedFile = {
  status: {
    form: {
      file: {
        s3Key: 'mock-s3-key'
      }
    }
  }
}

describe('handleUploadedFile', () => {
  let mockReq, mockLogger

  beforeEach(() => {
    mockReq = {
      s3: {
        send: jest.fn()
      },
      yar: {
        get: jest.fn().mockReturnValue({
          'upload-plan': {
            status: {
              form: {
                file: {
                  s3Key: 'test-key'
                }
              }
            }
          }
        })
      }
    }

    mockLogger = {
      info: jest.fn()
    }

    config.get = jest.fn().mockReturnValue({
      bucket: 'test-bucket'
    })
  })

  it('should handle PDF files and log compression details', async () => {
    mockReq.s3.send.mockResolvedValue(mockS3ObjectPdf)

    const result = await handleUploadedFile(
      mockReq,
      mockUploadedFile,
      mockLogger
    )

    expect(mockReq.s3.send).toHaveBeenCalled()
    expect(compressPdf).toHaveBeenCalled()
    expect(mockLogger.info).toHaveBeenCalledWith(
      'Image compression took 100ms at a reduction of 50% to 1.5 MB'
    )
    expect(result).toEqual(Buffer.from('compressed-pdf'))
  })

  it('should handle image files and log compression details', async () => {
    mockReq.s3.send.mockResolvedValue(mockS3Object)

    const result = await handleUploadedFile(
      mockReq,
      mockUploadedFile,
      mockLogger
    )

    expect(mockReq.s3.send).toHaveBeenCalled()
    expect(compressImage).toHaveBeenCalled()
    expect(mockLogger.info).toHaveBeenCalledWith(
      'Image compression took 200ms at a reduction of 30% to 1.5 MB'
    )
    expect(result).toEqual(Buffer.from('compressed-image'))
  })
})
