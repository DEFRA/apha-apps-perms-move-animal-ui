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

export const headers = {
  'Cross-Origin-Resource-Policy': 'same-origin',
  // 'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': features.map((feature) => `${feature}=()`).join(','),
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}

/**
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
export function allRequests(request, h) {
  const { response } = request

  if (!('isBoom' in response)) {
    Object.entries(headers).forEach(([key, value]) => {
      response.header(key, value)
    })
  }

  return h.continue
}

/**
 * @import { Request, ResponseToolkit } from '@hapi/hapi'
 */
