import sharp from 'sharp'
import {
  fileSizeInBytes,
  fileSizeReductionPercentage
} from '~/src/server/common/helpers/file/size.js'

const maxLongestEdge = 1920
const maxShortestEdge = 1080
const minimumThreshold = 0.95
const defaultWidth = 1920
const defaultHeight = 1080

/**
 * Resizes an image buffer to specified dimensions while maintaining aspect ratio.
 * @param {Buffer} buffer - The image buffer to be resized.
 * @param {number} width - The desired width of the resized image. Defaults to `defaultWidth`.
 * @param {number} height - The desired height of the resized image. Defaults to `defaultHeight`.
 * @returns {sharp.Sharp} - A Sharp instance representing the resized image.
 */
const resizeImage = (buffer, width = defaultWidth, height = defaultHeight) => {
  const compressed = sharp(buffer)
  if (width > height || width > maxLongestEdge) {
    compressed.resize({
      width: maxLongestEdge,
      height: maxShortestEdge,
      fit: 'inside'
    })
  } else if (height > width && height > maxLongestEdge) {
    compressed.resize({
      width: maxShortestEdge,
      height: maxLongestEdge,
      fit: 'inside'
    })
  } else {
    compressed.resize({ fit: 'inside' })
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
 * }>}
 */
export const compressToTargetSize = async (
  buffer,
  targetFileSize,
  lowerThreshold,
  upperThreshold
) => {
  let low = 0
  let high = 100
  let resizedBuffer = buffer

  if (buffer.length > upperThreshold) {
    while (low <= high) {
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
        break
      } else if (compressedSize < targetFileSize) {
        low = mid + 1
        resizedBuffer = tempBuffer
      } else {
        high = mid - 1
      }
    }
  }

  return { resizedBuffer }
}

/**
 * Compresses an image buffer to a target file size
 * @async
 * @function
 * @param {Buffer} buffer - The original image buffer to be compressed.
 * @returns {Promise<object>} An object containing the compressed image and metadata:
 * - `file` {Buffer}: The compressed image buffer.
 * - `start` {number}: The timestamp when the compression started.
 * - `end` {number}: The timestamp when the compression ended.
 * - `duration` {number}: The duration of the compression process in milliseconds.
 * - `originalSize` {number}: The size of the original image buffer in bytes.
 * - `reduction` {number}: The percentage reduction in file size.
 * - `size` {number}: The size of the compressed image buffer in bytes.
 */
export const compress = async (buffer) => {
  const originalSize = buffer.length
  const start = Date.now()
  const targetFileSize = fileSizeInBytes(2)
  const lowerThreshold = targetFileSize * minimumThreshold
  const upperThreshold = targetFileSize

  const { width, height } = await sharp(buffer).metadata()
  const compressed = resizeImage(buffer, width, height)
  compressed.jpeg({ progressive: true })
  const resizedBuffer = await compressed.toBuffer()

  const { resizedBuffer: finalBuffer } = await compressToTargetSize(
    resizedBuffer,
    targetFileSize,
    lowerThreshold,
    upperThreshold
  )

  const end = Date.now()

  return {
    file: finalBuffer,
    start,
    end,
    duration: end - start,
    originalSize,
    reduction: fileSizeReductionPercentage(originalSize, finalBuffer.length),
    size: finalBuffer.length
  }
}
