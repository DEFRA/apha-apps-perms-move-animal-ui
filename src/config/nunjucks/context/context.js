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

const footerItems = [
  {
    href: '/privacy-policy',
    text: 'Privacy',
    attributes: {
      'data-testid': 'privacy-policy-link'
    }
  },
  {
    href: '/cookies',
    text: 'Cookies',
    attributes: {
      'data-testid': 'cookies-link'
    }
  },
  {
    href: '/accessibility-statement',
    text: 'Accessibility statement',
    attributes: {
      'data-testid': 'accessibility-statement-link'
    }
  },
  {
    href: 'https://your-account.cpdev.cui.defra.gov.uk/management',
    text: 'Account management',
    requiresAuth: true
  },
  {
    href: '/auth/logout',
    text: 'Sign out',
    requiresAuth: true
  }
]

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

  return {
    assetPath: `${assetPath}/assets`,
    serviceName: config.get('serviceName'),
    serviceUrl: '/',
    breadcrumbs: [],
    navigation: buildNavigation(request),
    isAuthenticated: isAuthenticated(request),
    footerItems: footerItems.filter((item) => {
      if (!item.requiresAuth) {
        return true
      }

      return isAuthenticated(request)
    }),

    /**
     * @param {string} asset
     */
    getAssetPath(asset) {
      const webpackAssetPath = webpackManifest?.[asset]
      return `${assetPath}/${webpackAssetPath ?? asset}`
    }
  }
}

/**
 * @import { Request } from '@hapi/hapi'
 */
