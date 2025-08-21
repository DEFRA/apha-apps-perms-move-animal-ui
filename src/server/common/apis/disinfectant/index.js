import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { buildRedisClient } from '../../helpers/redis-client.js'
import { createLogger } from '../../helpers/logging/logger.js'

/**
 * @typedef {{ Disinfectant_name: string, Approved_dilution_rate: string }} DisinfectantRawData
 * @typedef {{ name: string, dilutionRate: string, isLiquid: boolean, isUndiluted: boolean }} DisinfectantItem
 */

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
 * Deduplicate filtered disinfectants based on disinfectant name
 * @param {Array<{
 *   Disinfectant_name: string,
 *   Approved_dilution_rate: string
 * }>} disinfectants - Array of disinfectants to deduplicate
 * @returns {Array<{
 *   Disinfectant_name: string,
 *   Approved_dilution_rate: string
 * }>} - Deduplicated array of disinfectants
 */
export const dedupeFilteredDisinfectants = (disinfectants) => {
  if (!Array.isArray(disinfectants)) {
    return []
  }

  const seen = new Set()
  return disinfectants.filter((disinfectant) => {
    if (!disinfectant?.Disinfectant_name) {
      return false
    }

    const key = disinfectant.Disinfectant_name.toLowerCase().trim()
    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

/**
 * Fetch approved disinfectants from the API
 * @param {string} type - The type of disinfectant to fetch
 * @returns {Promise<DisinfectantItem[]>} - A promise that resolves to an array of approved disinfectants
 */
export const fetchDisinfectants = async (type) => {
  let filteredDisinfectants
  try {
    const response = await Wreck.get(
      `${config.get('api.disinfectant.baseUrl')}${config.get('api.disinfectant.path')}?type=${type}`
    )

    const items = response.payload.toString()

    try {
      await cache.setex(
        `api:disinfectants:${type}`,
        config.get('api.disinfectant.cache.TTL'),
        items
      )
    } catch (e) {
      logger.error(`Failed to cache disinfectants of type ${type}:`, e)
    }

    filteredDisinfectants = JSON.parse(items).filteredDisinfectants ?? []
  } catch (e) {
    logger.error(
      `Failed to fetch disinfectants of type ${type} from api attempting to fetch result from cache:`,
      e
    )

    const items = await cache.get(`api:disinfectants:${type}`)

    if (!items) {
      logger.error(
        `Failed to fetch disinfectants of type ${type} from cache:`,
        e
      )
      throw new Error(
        `Failed to fetch disinfectants of type ${type} from API and cache empty`
      )
    }

    filteredDisinfectants = JSON.parse(items).filteredDisinfectants ?? []
  }
  return transformDisinfectantList(
    dedupeFilteredDisinfectants(filteredDisinfectants)
  )
}

/**
 * @param {DisinfectantRawData[]} disinfectants
 * @returns {DisinfectantItem[]}
 */
const transformDisinfectantList = (disinfectants) => {
  return disinfectants.map((item) => {
    return {
      name: item.Disinfectant_name,
      dilutionRate: item.Approved_dilution_rate.split(' ')[0],
      isLiquid: !item.Approved_dilution_rate.includes('*'),
      isUndiluted: item.Approved_dilution_rate === 'Undiluted'
    }
  })
}
