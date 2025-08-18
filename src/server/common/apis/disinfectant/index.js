import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { buildRedisClient } from '../../helpers/redis-client.js'
import { createLogger } from '../../helpers/logging/logger.js'

/**
 * @import { Redis } from 'ioredis'
 */

const logger = createLogger()

/*
 * @type {Redis}
 */
export const cache = buildRedisClient({
  host: config.get('redis.host'),
  username: config.get('redis.username'),
  password: config.get('redis.password'),
  keyPrefix: config.get('redis.keyPrefix'),
  useSingleInstanceCache: config.get('redis.useSingleInstanceCache'),
  useTLS: config.get('redis.useTLS'),
  db: config.get('api.disinfectant.cache.database')
})

/**
 * Fetch approved disinfectants from the API
 * @param {string} type - The type of disinfectant to fetch
 * @returns {Promise<Array<{
 *   Disinfectant_name: string,
 *   Approved_dilution_rate: string
 * }>>} - A promise that resolves to an array of approved disinfectants
 */
export const fetchDisinfectants = async (type) => {
  let items
  try {
    const response = await Wreck.get(
      `${config.get('api.disinfectant.baseUrl')}${config.get('api.disinfectant.path')}?type=${type}`
    )

    items = response.payload.toString()
    return JSON.parse(items).filteredDisinfectants ?? []
  } catch (e) {
    items = await cache.get(`api:disinfectants:${type}`)
    logger.error(
      `Failed to fetch disinfectants of type ${type} from api attempting to fetch result from cache:`,
      e
    )

    if (items) {
      return JSON.parse(items).filteredDisinfectants ?? []
    }

    logger.error(`Failed to fetch disinfectants of type ${type} from cache:`, e)
    throw new Error(
      `Failed to fetch disinfectants of type ${type} from API and cache empty`
    )
  } finally {
    try {
      await cache.setex(
        `api:disinfectants:${type}`,
        config.get('api.disinfectant.cache.TTL'),
        items
      )
    } catch (e) {
      logger.error(`Failed to cache disinfectants of type ${type}:`, e)
    }
  }
}
