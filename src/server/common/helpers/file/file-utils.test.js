import { handleUploadedFile } from './file-utils.js'

const mockChunk1 = Buffer.from('chunk1')
const mockChunk2 = Buffer.from('chunk2')
const fileStream = new ReadableStream({
  start(controller) {
    controller.enqueue(mockChunk1)
    controller.enqueue(mockChunk2)
    controller.close()
  }
})

const mockS3Object = {
  Body: fileStream
}

const mockS3ObjectPdf = {
  ...mockS3Object,
  ContentType: 'application/pdf'
}

describe('handleUploadedFile', () => {
  let mockReq, mockLogger, mockS3, mockCompressPdf, mockCompressImage

  beforeEach(() => {
    mockLogger = { info: jest.fn() }
    mockCompressPdf = jest.fn()
    mockCompressImage = jest.fn()

    jest.mock('./pdf-compression.js', () => ({
      compressPdf: mockCompressPdf
    }))
    jest.mock('./image-compression.js', () => ({
      compress: mockCompressImage
    }))
    jest.mock('./size.js', () => ({
      fileSizeInMB: jest.fn((size) => size / (1024 * 1024))
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it('should compress a PDF file and log the details', async () => {
    mockS3 = jest.fn().mockReturnValue(mockS3ObjectPdf)
    mockReq = { s3: mockS3 }

    const mockBuffer = Buffer.from('mock-pdf-content')
    const mockCompressedFile = Buffer.from('compressed-pdf-content')
    const mockDuration = 100
    const mockReduction = 50

    mockCompressPdf.mockResolvedValue({
      file: mockCompressedFile,
      duration: mockDuration,
      reduction: mockReduction
    })

    const result = await handleUploadedFile(
      mockReq,
      'mock/path/to/file.pdf',
      mockLogger
    )

    expect(result).toBe(mockCompressedFile)
    expect(mockCompressPdf).toHaveBeenCalledWith(mockBuffer)
    expect(mockLogger.info).toHaveBeenCalledWith(
      `Image compression took ${mockDuration}ms at a reduction of ${mockReduction}% to ${mockCompressedFile.length / (1024 * 1024)} MB`
    )
  })

  it('should compress an image file and log the details', async () => {
    mockS3 = jest.fn().mockReturnValue(mockS3Object)
    mockReq = { s3: mockS3 }

    const mockBuffer = Buffer.from('mock-image-content')
    const mockCompressedFile = Buffer.from('compressed-image-content')
    const mockDuration = 200
    const mockReduction = 30

    mockCompressImage.mockResolvedValue({
      file: mockCompressedFile,
      duration: mockDuration,
      reduction: mockReduction
    })

    const result = await handleUploadedFile(
      mockReq,
      'mock/path/to/file.jpg',
      mockLogger
    )

    expect(result).toBe(mockCompressedFile)
    expect(mockCompressImage).toHaveBeenCalledWith(mockBuffer)
    expect(mockLogger.info).toHaveBeenCalledWith(
      `Image compression took ${mockDuration}ms at a reduction of ${mockReduction}% to ${mockCompressedFile.length / (1024 * 1024)} MB`
    )
  })
})
