import sharp from 'sharp'

const maxLongestEdge = 1920
const maxShortestEdge = 1080
const minimumThreshold = 0.95

const resizeImage = (buffer, width, height) => {
  const compressed = sharp(buffer)
  if (width > height && width > 1920) {
    compressed.resize({
      width: maxLongestEdge,
      height: maxShortestEdge,
      fit: 'inside'
    })
  } else if (height > width && height > 1920) {
    compressed.resize({
      width: maxShortestEdge,
      height: maxLongestEdge,
      fit: 'inside'
    })
  }
  return compressed
}

/**
 *
 * @param {Buffer} buffer
 * @param {number} targetFileSize
 * @param {number} lowerThreshold
 * @param {number} upperThreshold
 * @returns {Promise<{
 *  resizedBuffer: Buffer,
 *  quality: number,
 *  manipulations: number
 * }>}
 */
const compressToTargetSize = async (
  buffer,
  targetFileSize,
  lowerThreshold,
  upperThreshold
) => {
  let low = 0
  let high = 100
  let quality = 100
  let manipulations = 1
  let resizedBuffer = buffer

  if (buffer.length > upperThreshold) {
    while (low <= high) {
      manipulations++
      const mid = Math.floor((low + high) / 2)

      const tempBuffer = await sharp(resizedBuffer)
        .jpeg({ quality: mid })
        .toBuffer()
      const compressedSize = tempBuffer.length

      if (
        compressedSize <= targetFileSize &&
        compressedSize >= lowerThreshold
      ) {
        resizedBuffer = tempBuffer
        quality = mid
        break
      } else if (compressedSize < targetFileSize) {
        low = mid + 1
        resizedBuffer = tempBuffer
      } else {
        high = mid - 1
      }
    }
  }

  return { resizedBuffer, quality, manipulations }
}

export const compress = async (buffer) => {
  const originalSize = buffer.length
  const start = Date.now()
  const targetFileSize = 2 * 1024 * 1024 // 2 MB in bytes
  const lowerThreshold = targetFileSize * minimumThreshold
  const upperThreshold = targetFileSize

  const { width, height } = await sharp(buffer).metadata()
  const compressed = resizeImage(buffer, width, height)
  compressed.jpeg({ progressive: true })
  const resizedBuffer = await compressed.toBuffer()

  const {
    resizedBuffer: finalBuffer,
    quality,
    manipulations
  } = await compressToTargetSize(
    resizedBuffer,
    targetFileSize,
    lowerThreshold,
    upperThreshold
  )

  const end = Date.now()
  const blob = new Blob([finalBuffer])
  return {
    file: new File([blob], 'biosecurity-map.jpg'),
    start,
    end,
    duration: end - start,
    quality,
    manipulations,
    originalSize,
    size: finalBuffer.length
  }
}
