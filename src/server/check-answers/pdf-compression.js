import { compress as compressPDF } from 'compress-pdf'
import { config } from '~/src/config/config.js'

export const compress = async (buffer) => {
  const originalSize = buffer.length
  const start = Date.now()
  const finalBuffer = await compressPDF(buffer, {
    gsModule: config.get('gsPath'),
    compatibilityLevel: 1.4
  })
  const end = Date.now()

  return {
    file: finalBuffer,
    start,
    end,
    duration: end - start,
    originalSize,
    reduction: 100 - (finalBuffer.length * 100) / originalSize,
    size: finalBuffer.length
  }
}
