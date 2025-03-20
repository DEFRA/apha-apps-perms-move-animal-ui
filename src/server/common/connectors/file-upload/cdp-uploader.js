import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'

export async function checkStatus(uploadId) {
  const { uploaderUrl } = config.get('fileUpload')

  return Wreck.get(`${uploaderUrl}/status/${uploadId}`)
}

export async function initiateFileUpload(redirectUrl) {
  const { bucket, uploaderUrl, path } = config.get('fileUpload')

  const mimeTypes = ['image/png', 'image/jpeg']

  if (config.get('featureFlags').pdfUpload) {
    mimeTypes.push('application/pdf')
  }

  return Wreck.post(`${uploaderUrl}/initiate`, {
    payload: JSON.stringify({
      redirect: redirectUrl,
      s3Bucket: bucket,
      s3Path: path,
      mimeTypes,
      maxFileSize: 1024 * 1024 * 10
    })
  })
}
