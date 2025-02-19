import sharp from 'sharp'

export const compress = async (buffer) => {
  const originalSize = buffer.length

  const start = Date.now()
  const targetFileSize = 2 * 1024 * 1024 // 2 MB in bytes
  let low = 0
  let high = 100

  const lowerThreshold = targetFileSize * 0.95
  const upperThreshold = targetFileSize

  const { width, height } = await sharp(buffer).metadata()
  const compressed = sharp(buffer)
  let manipulations = 1

  const x = width ?? 0
  const y = height ?? 0

  if (x > y && x > 1920) {
    compressed.resize({
      width: 1920,
      height: 1080,
      fit: 'inside'
    })
  } else if (y > x && y > 1920) {
    compressed.resize({
      width: 1080,
      height: 1920,
      fit: 'inside'
    })
  } else {
    manipulations--
  }

  compressed.jpeg({ progressive: true })
  let resizedBuffer = await compressed.toBuffer()
  let quality = 100

  if (resizedBuffer.length > upperThreshold) {
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

  const end = Date.now()

  const blob = new Blob([resizedBuffer])
  return {
    file: new File([blob], 'biosecurity-map.jpg'),
    start,
    end,
    duration: end - start,
    quality,
    manipulations,
    originalSize,
    size: resizedBuffer.length
  }
}
