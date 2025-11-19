import path from 'path'
import hapi from '@hapi/hapi'
import { config } from '~/src/config/config.js'
import { nunjucksConfig } from '~/src/config/nunjucks/nunjucks.js'
import { router } from './router.js'
import { requestLogger } from '~/src/server/common/helpers/logging/request-logger.js'
import { catchAll } from '~/src/server/common/helpers/errors.js'
import { allRequests } from '~/src/server/common/helpers/headers/index.js'
import { secureContext } from '~/src/server/common/helpers/secure-context/index.js'
import { sessionCache } from '~/src/server/common/helpers/session-cache/session-cache.js'
import { getCacheEngine } from '~/src/server/common/helpers/session-cache/cache-engine.js'
import { pulse } from '~/src/server/common/helpers/pulse.js'
import { csrfPlugin } from '~/src/server/common/helpers/csrf-plugin.js'
import { disableClientCache } from './common/helpers/client-cache.js/client-cache.js'
import { addSecurityHeaders } from './common/helpers/security-headers/index.js'
import { addUUIDToRequest } from './common/helpers/request-identification/index.js'
import { defraFormsPluginOptions } from './common/plugins/defra-forms/index.js'
import defraForms from '@defra/forms-engine-plugin'
import { CacheService } from '@defra/forms-engine-plugin/cache-service.js'
import { CustomCacheService } from './common/plugins/defra-forms/custom-cache-service.js'

export async function createServer() {
  const server = hapi.server({
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      files: {
        relativeTo: path.resolve(config.get('root'), '.public')
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    },
    cache: [
      {
        name: config.get('session.cache.name'),
        engine: getCacheEngine(
          /** @type {Engine} */ (config.get('session.cache.engine'))
        )
      }
    ]
  })

  await server.register([
    requestLogger,
    secureContext,
    pulse,
    sessionCache,
    nunjucksConfig,
    csrfPlugin,
    router // Register all the controllers/routes defined in src/server/router.js
  ])



  const cacheService = new CustomCacheService({
    server,
    cacheName: config.get('session').cache.name
  })

  await server.register({
    plugin: defraForms,
    options: {
      cache: cacheService,
      ...defraFormsPluginOptions
    }
  })

  server.ext('onRequest', addUUIDToRequest)
  server.ext('onPreResponse', disableClientCache)
  server.ext('onPreResponse', catchAll)
  server.ext('onPreResponse', allRequests)
  server.ext('onPreResponse', addSecurityHeaders)

  return server
}

/**
 * @import {Engine} from '~/src/server/common/helpers/session-cache/cache-engine.js'
 */
