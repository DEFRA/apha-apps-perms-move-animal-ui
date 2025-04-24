import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { createServer } from '~/src/server/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { provideProxy } from './proxy.js'

async function startServer() {
  let server

  const proxy = provideProxy()
  // if (proxy?.httpAndHttpsProxyAgent) {
  //   createLogger().info('Wreck agents setup')
  //   const httpAndHttpsProxyAgent = proxy.httpAndHttpsProxyAgent

  //   Wreck.agents = {
  //     https: httpAndHttpsProxyAgent,
  //     http: httpAndHttpsProxyAgent,
  //     httpsAllowUnauthorized: httpAndHttpsProxyAgent
  //   }
  // }

  try {
    server = await createServer()
    await server.start()

    server.logger.info('Server started successfully')
    server.logger.info(
      `Access your frontend on http://localhost:${config.get('port')}`
    )
    server.logger.info(
      `Feature flags configuration: ${JSON.stringify(config.get('featureFlags'))}`
    )
  } catch (error) {
    const logger = createLogger()
    logger.info('Server failed to start :(')
    logger.error(error)
  }

  return server
}

export { startServer }
