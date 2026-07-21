import path from 'node:path'
import { readFileSync } from 'node:fs'

import { config } from '~/src/config/config.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation.js'
import { isAuthenticated } from '~/src/server/common/helpers/auth/isAuthenticated.js'

const logger = createLogger()
const assetPath = config.get('assetPath')
const manifestPath = path.join(
  config.get('root'),
  '.public/assets-manifest.json'
)

/** @type {Record<string, string> | undefined} */
let webpackManifest

/**
 * @param {Request} req
 */
const getServiceUrl = (req) => {
  const serviceGovUkDomain = config.get('homepage.serviceGovUkDomain')
  const serviceGovUkRedirectUrl = config.get('homepage.serviceGovUkRedirectUrl')

  if (serviceGovUkDomain && serviceGovUkRedirectUrl) {
    const host = req.headers.host
    const requestHost = Array.isArray(host) ? host[0] : host
    const hostname = requestHost?.split(':')[0]
    if (hostname === serviceGovUkDomain) {
      return serviceGovUkRedirectUrl
    }
  }

  const knownJourneys = {
    fmd: '/fmd/',
    exotics: '/exotics/'
  }

  for (const key of Object.keys(knownJourneys)) {
    if (req.path.startsWith(knownJourneys[key])) {
      return knownJourneys[key]
    }
  }

  return '/'
}

export const extractJourneyIndex = getServiceUrl

/**
 * @param {Request | null} request
 */
export function context(request) {
  if (!webpackManifest) {
    try {
      webpackManifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
    } catch (e) {
      logger.error(`Webpack ${path.basename(manifestPath)} not found`)
      logger.error(e)
    }
  }

  // we have to use a different property name here
  // to avoid clashing with the serviceUrl property added by defra-forms-engine
  const initialServiceUrl = request ? extractJourneyIndex(request) : '/'

  return {
    initialServiceUrl,
    assetPath: `${assetPath}/assets/rebrand`,
    serviceName: config.get('serviceName'),
    breadcrumbs: [],
    manageAccountUrl: config.get('auth').manageAccountUrl,
    navigation: buildNavigation(request),
    isAuthenticated: isAuthenticated(request),
    displayName: request?.auth?.credentials?.displayName,
    features: config.get('featureFlags'),
    uuid: /** @type {{ uuid?: string }} */ (request?.app)?.uuid,
    /** @param {string} asset */
    getAssetPath(asset) {
      const webpackAssetPath = webpackManifest?.[asset]
      return `${assetPath}/${webpackAssetPath ?? asset}`
    }
  }
}

/**
 * @import { Request } from '@hapi/hapi'
 */
