import { compressPdf } from './pdf-compression.js'
import { compress as compressImage } from './image-compression.js'
import { fileSizeInMB } from './size.js'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from '~/src/config/config.js'

/**
 * Handles the uploaded file by processing it based on its content type.
 * Compresses the file if it is a PDF or an image, logs the compression details,
 * and returns the processed file.
 * @param {object} req - The request object containing the S3 method to retrieve the file.
 * @param {object} uploadedFile - The file retrieved from the S3 bucket.
 * @param {object} logger - The logger instance used to log compression details.
 * @returns {Promise<{file: Buffer, extension: 'pdf' | 'jpg'}>} - A promise that resolves to the compressed file buffer.
 */
export const handleUploadedFile = async (req, uploadedFile, logger) => {
  const obj = await req.s3.send(
    new GetObjectCommand({
      Bucket: config.get('fileUpload').bucket ?? '',
      Key: uploadedFile.status.form.file.s3Key
    })
  )

  const chunks = []
  for await (const chunk of obj.Body) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)

  const { file, duration, reduction } =
    obj.ContentType === 'application/pdf'
      ? await compressPdf(buffer)
      : await compressImage(buffer)

  logger.info(
    `Image compression took ${duration}ms at a reduction of ${reduction}% to ${fileSizeInMB(file.length)} MB`
  )

  return {
    file,
    extension: obj.ContentType === 'application/pdf' ? 'pdf' : 'jpg'
  }
}
