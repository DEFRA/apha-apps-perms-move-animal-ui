import { compress } from './pdf-compression.js'
import { compress as compressPDF } from 'compress-pdf'
import { config } from '~/src/config/config.js'

jest.mock('compress-pdf', () => ({
  compress: jest.fn()
}))

describe('PDF Compression', () => {
  it('should compress a PDF file and return compression details', async () => {
    const buffer = Buffer.from('%PDF-1.4\n...')
    const compressedBuffer = Buffer.from('%PDF-1.4\n...compressed')

    // @ts-expect-error jest is unable to recognise the mock on an entire module
    compressPDF.mockResolvedValue(compressedBuffer)
    config.get = jest.fn().mockReturnValue('/path/to/gs')

    const result = await compress(buffer)

    expect(compressPDF).toHaveBeenCalledWith(buffer, {
      gsModule: '/path/to/gs',
      compatibilityLevel: 1.4
    })
    expect(result.file).toBe(compressedBuffer)
    expect(result.originalSize).toBe(buffer.length)
    expect(result.size).toBe(compressedBuffer.length)
    expect(result.reduction).toBe(
      100 - (compressedBuffer.length * 100) / buffer.length
    )
    expect(result.duration).toBeGreaterThanOrEqual(0)
  })
})
