import { compress } from './image-compression.js'
import { readFile } from 'fs/promises'
import sharp from 'sharp'
import path from 'path'

jest.mock('sharp', () => {
  const sharp = jest.fn(() => ({
    metadata: jest.fn(),
    resize: jest.fn().mockReturnThis(),
    jpeg: jest.fn().mockReturnThis(),
    toBuffer: jest.fn()
  }))
  return sharp
})

describe('imageCompression', () => {
  let buffer

  beforeEach(async () => {
    buffer = await readFile(
      path.resolve('./src/server/check-answers/example-portrait.jpg')
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should compress the image and return the file', async () => {
    const mockSharpInstance = {
      metadata: jest.fn().mockResolvedValue({ width: 3000, height: 2000 }),
      resize: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockResolvedValue(Buffer.alloc(1.5 * 1024 * 1024))
    }
    // @ts-expect-error jest is unable to recognise the mock on an entire module
    sharp.mockImplementation(() => mockSharpInstance)

    const result = await compress(buffer)

    expect(result).toHaveProperty('file')
    expect(result.file).toBeInstanceOf(File)
    expect(result.file.name).toBe('biosecurity-map.jpg')
    expect(result).toHaveProperty('start')
    expect(result).toHaveProperty('end')
    expect(result).toHaveProperty('duration')
    expect(result).toHaveProperty('quality')
    expect(result).toHaveProperty('manipulations')
  })

  it('should resize the image if width is greater than height', async () => {
    const mockSharpInstance = {
      metadata: jest.fn().mockResolvedValue({ width: 3000, height: 2000 }),
      resize: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockResolvedValue(Buffer.alloc(1.5 * 1024 * 1024))
    }

    // @ts-expect-error jest is unable to recognise the mock on an entire module
    sharp.mockImplementation(() => mockSharpInstance)

    await compress(buffer)

    expect(mockSharpInstance.resize).toHaveBeenCalledWith({
      width: 1920,
      height: 1080,
      fit: 'inside'
    })
  })

  it('should resize the image if height is greater than width', async () => {
    const mockSharpInstance = {
      metadata: jest.fn().mockResolvedValue({ width: 2000, height: 3000 }),
      resize: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockResolvedValue(Buffer.alloc(1.5 * 1024 * 1024))
    }

    // @ts-expect-error jest is unable to recognise the mock on an entire module
    sharp.mockImplementation(() => mockSharpInstance)

    await compress(buffer)

    expect(mockSharpInstance.resize).toHaveBeenCalledWith({
      width: 1080,
      height: 1920,
      fit: 'inside'
    })
  })

  it('should perform binary search compression if resized buffer is too large', async () => {
    const mockSharpInstance = {
      metadata: jest.fn().mockResolvedValue({ width: 3000, height: 2000 }),
      resize: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest
        .fn()
        .mockResolvedValueOnce(Buffer.alloc(3 * 1024 * 1024))
        .mockResolvedValueOnce(Buffer.alloc(2 * 1024 * 1024))
        .mockResolvedValueOnce(Buffer.alloc(1.8 * 1024 * 1024))
    }

    // @ts-expect-error jest is unable to recognise the mock on an entire module
    sharp.mockImplementation(() => mockSharpInstance)

    await compress(buffer)

    expect(mockSharpInstance.jpeg).toHaveBeenCalledWith({
      quality: expect.any(Number)
    })
    expect(mockSharpInstance.toBuffer).toHaveBeenCalledTimes(2)
  })

  it('should not perform binary search compression if resized buffer is within threshold', async () => {
    const mockSharpInstance = {
      metadata: jest.fn().mockResolvedValue({ width: 3000, height: 2000 }),
      resize: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest.fn().mockResolvedValue(Buffer.alloc(1.5 * 1024 * 1024))
    }

    // @ts-expect-error jest is unable to recognise the mock on an entire module
    sharp.mockImplementation(() => mockSharpInstance)

    await compress(buffer)

    expect(mockSharpInstance.jpeg).toHaveBeenCalledWith({ progressive: true })
    expect(mockSharpInstance.toBuffer).toHaveBeenCalledTimes(1)
  })
})
