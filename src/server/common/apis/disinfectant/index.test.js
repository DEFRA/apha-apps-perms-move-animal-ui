import Wreck from '@hapi/wreck'
import { fetchDisinfectants, cache } from './index.js'
import { statusCodes } from '../../constants/status-codes.js'

// Mock all dependencies
jest.mock('@hapi/wreck')
const mockLoggerLog = jest.fn()
const mockLoggerError = jest.fn()

const mockedWreck = jest.spyOn(Wreck, 'get')

jest.mock('~/src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({
    log: (...args) => mockLoggerLog(...args),
    error: (...args) => mockLoggerError(...args)
  })
}))

// Mock ioredis to provide the methods we need
jest.mock('ioredis', () => ({
  ...jest.requireActual('ioredis'),
  Cluster: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    get: jest.fn(),
    setex: jest.fn()
  })),
  Redis: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    get: jest.fn(),
    setex: jest.fn()
  }))
}))

const cacheSetex = jest.spyOn(cache, 'setex')
const cacheGet = jest.spyOn(cache, 'get')

const disinfectantType = 'tbo'

describe('fetchDisinfectants API module', () => {
  // Mock data that would be returned from the API
  const mockDisinfectantData = {
    filteredDisinfectants: [
      {
        Disinfectant_name: 'Test Disinfectant 1',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Test Disinfectant 2',
        Approved_dilution_rate: '1:200'
      }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should work with a happy path', async () => {
    mockedWreck.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify(mockDisinfectantData),
        res: { statusCode: statusCodes.ok }
      })
    )

    const result = await fetchDisinfectants(disinfectantType)

    expect(cacheSetex).toHaveBeenCalledWith(
      `api:disinfectants:${disinfectantType}`,
      expect.any(Number),
      JSON.stringify(mockDisinfectantData)
    )

    expect(result).toEqual(mockDisinfectantData.filteredDisinfectants)
  })

  it('should fallback to cache when API fails', async () => {
    const apiError = new Error('API is down')
    mockedWreck.mockRejectedValue(apiError)
    cacheGet.mockResolvedValue(JSON.stringify(mockDisinfectantData))

    const result = await fetchDisinfectants(disinfectantType)

    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to fetch disinfectants of type ${disinfectantType} from api attempting to fetch result from cache:`,
      apiError
    )
    expect(cacheGet).toHaveBeenCalledWith(
      `api:disinfectants:${disinfectantType}`
    )
    expect(result).toEqual(mockDisinfectantData.filteredDisinfectants)
  })

  it('should throw error when both API and cache fail', async () => {
    const apiError = new Error('API is down')

    mockedWreck.mockRejectedValue(apiError)
    cacheGet.mockResolvedValue(null)

    await expect(fetchDisinfectants(disinfectantType)).rejects.toThrow(
      `Failed to fetch disinfectants of type ${disinfectantType} from API and cache empty`
    )

    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to fetch disinfectants of type ${disinfectantType} from api attempting to fetch result from cache:`,
      apiError
    )
    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to fetch disinfectants of type ${disinfectantType} from cache:`,
      apiError
    )
  })

  it('should handle cache write failures gracefully', async () => {
    const cacheWriteError = new Error('Cache write failed')

    mockedWreck.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify(mockDisinfectantData),
        res: { statusCode: statusCodes.ok }
      })
    )
    cacheSetex.mockRejectedValue(cacheWriteError)

    const result = await fetchDisinfectants(disinfectantType)

    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to cache disinfectants of type ${disinfectantType}:`,
      cacheWriteError
    )
    expect(result).toEqual(mockDisinfectantData.filteredDisinfectants)
  })

  it('should return empty array when filteredDisinfectants is missing from API response', async () => {
    const dataWithoutFilteredDisinfectants = {
      someOtherData: 'test'
    }

    mockedWreck.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify(dataWithoutFilteredDisinfectants),
        res: { statusCode: statusCodes.ok }
      })
    )

    const result = await fetchDisinfectants(disinfectantType)

    expect(result).toEqual([])
  })

  it('should return empty array when filteredDisinfectants is missing from cache response', async () => {
    const apiError = new Error('API is down')
    const dataWithoutFilteredDisinfectants = {
      someOtherData: 'test'
    }

    mockedWreck.mockRejectedValue(apiError)
    cacheGet.mockResolvedValue(JSON.stringify(dataWithoutFilteredDisinfectants))

    const result = await fetchDisinfectants(disinfectantType)

    expect(result).toEqual([])
  })

  it('should handle invalid JSON in API response', async () => {
    const invalidJson = 'invalid json{'

    mockedWreck.mockResolvedValue(
      /** @type {any} */ ({
        payload: invalidJson,
        res: { statusCode: statusCodes.ok }
      })
    )
    cacheGet.mockResolvedValue(null)

    await expect(fetchDisinfectants(disinfectantType)).rejects.toThrow(
      `Failed to fetch disinfectants of type ${disinfectantType} from API and cache empty`
    )

    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to fetch disinfectants of type ${disinfectantType} from api attempting to fetch result from cache:`,
      expect.any(SyntaxError)
    )
  })
})
