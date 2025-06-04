import { statusCodes } from '~/src/server/common/constants/status-codes.js'

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
      'geolocation=(), microphone=(), camera=(), fullscreen=(), payment=(), usb=(), vr=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), web-share=(), xr-spatial-tracking=()'
    )
}

/**
 * @import { Request, ResponseToolkit } from '@hapi/hapi'
 */
