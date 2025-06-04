import { statusCodes } from '~/src/server/common/constants/status-codes.js'

export const features = [
  'accelerometer',
  'ambient-light-sensor',
  'attribution-reporting',
  'autoplay',
  'bluetooth',
  'browsing-topics',
  'camera',
  'compute-pressure',
  'cross-origin-isolated',
  'deferred-fetch',
  'deferred-fetch-minimal',
  'display-capture',
  'encrypted-media',
  'fullscreen',
  'gamepad',
  'geolocation',
  'gyroscope',
  'hid',
  'identity-credentials-get',
  'idle-detection',
  'language-detector',
  'local-fonts',
  'magnetometer',
  'microphone',
  'midi',
  'otp-credentials',
  'payment',
  'picture-in-picture',
  'publickey-credentials-create',
  'publickey-credentials-get',
  'screen-wake-lock',
  'serial',
  'speaker-selection',
  'storage-access',
  'translator',
  'summarizer',
  'usb',
  'web-share',
  'window-management',
  'xr-spatial-tracking'
]

/**
 * @param {number} statusCode
 */
function statusCodeMessage(statusCode) {
  switch (true) {
    case statusCode === statusCodes.notFound:
      return 'Page not found'
    case statusCode === statusCodes.forbidden:
      return 'Forbidden'
    case statusCode === statusCodes.unauthorized:
      return 'Unauthorized'
    case statusCode === statusCodes.badRequest:
      return 'Bad Request'
    default:
      return 'Something went wrong'
  }
}

const lowestServerErrorStatusCode = 500

/**
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
export function catchAll(request, h) {
  const { response } = request

  if (!('isBoom' in response)) {
    return h.continue
  }

  const statusCode = response.output.statusCode
  const errorMessage = statusCodeMessage(statusCode)

  if (statusCode >= lowestServerErrorStatusCode) {
    request.logger.error(response?.stack)
  } else {
    request.logger.warn(response?.stack)
  }

  return h
    .view('error/index', {
      pageTitle: errorMessage,
      heading: statusCode,
      message: errorMessage
    })
    .code(statusCode)
    .header(
      'Permissions-Policy',
      features.map((feature) => `${feature}=()`).join(',')
    )
}

/**
 * @import { Request, ResponseToolkit } from '@hapi/hapi'
 */
