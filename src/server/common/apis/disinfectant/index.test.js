import Wreck from '@hapi/wreck'
import {
  fetchDisinfectants,
  cache,
  dedupeFilteredDisinfectants
} from './index.js'
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

  it('should throw error when API fails and cache fetch throws an error', async () => {
    const apiError = new Error('API is down')
    const cacheError = new Error('Redis connection failed')

    mockedWreck.mockRejectedValue(apiError)
    cacheGet.mockRejectedValue(cacheError)

    await expect(fetchDisinfectants(disinfectantType)).rejects.toThrow(
      cacheError
    )

    expect(mockLoggerError).toHaveBeenCalledWith(
      `Failed to fetch disinfectants of type ${disinfectantType} from api attempting to fetch result from cache:`,
      apiError
    )
    expect(cacheGet).toHaveBeenCalledWith(
      `api:disinfectants:${disinfectantType}`
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

describe('dedupeFilteredDisinfectants', () => {
  it('should return empty array when input is not an array', () => {
    expect(dedupeFilteredDisinfectants(/** @type {any} */ (null))).toEqual([])
    expect(dedupeFilteredDisinfectants(/** @type {any} */ (undefined))).toEqual(
      []
    )
    expect(
      dedupeFilteredDisinfectants(/** @type {any} */ ('not an array'))
    ).toEqual([])
    expect(dedupeFilteredDisinfectants(/** @type {any} */ (123))).toEqual([])
    expect(dedupeFilteredDisinfectants(/** @type {any} */ ({}))).toEqual([])
  })

  it('should return empty array when input is empty array', () => {
    expect(dedupeFilteredDisinfectants([])).toEqual([])
  })

  it('should filter out disinfectants without Disinfectant_name', () => {
    const input = /** @type {any} */ ([
      {
        Disinfectant_name: 'Valid Name',
        Approved_dilution_rate: '1:100'
      },
      { Approved_dilution_rate: '1:200' }, // Missing Disinfectant_name
      {
        Disinfectant_name: null,
        Approved_dilution_rate: '1:300'
      },
      {
        Disinfectant_name: undefined,
        Approved_dilution_rate: '1:400'
      },
      {
        Disinfectant_name: '',
        Approved_dilution_rate: '1:500'
      }
    ])

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toEqual([
      {
        Disinfectant_name: 'Valid Name',
        Approved_dilution_rate: '1:100'
      }
    ])
  })

  it('should deduplicate based on disinfectant name (case insensitive)', () => {
    const input = [
      {
        Disinfectant_name: 'Test Disinfectant',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'TEST DISINFECTANT',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: 'test disinfectant',
        Approved_dilution_rate: '1:300'
      },
      {
        Disinfectant_name: 'Another Disinfectant',
        Approved_dilution_rate: '1:400'
      }
    ]

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      {
        Disinfectant_name: 'Test Disinfectant',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Another Disinfectant',
        Approved_dilution_rate: '1:400'
      }
    ])
  })

  it('should deduplicate based on trimmed disinfectant names', () => {
    const input = [
      {
        Disinfectant_name: 'Test Disinfectant',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: '  Test Disinfectant  ',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: '\tTest Disinfectant\n',
        Approved_dilution_rate: '1:300'
      },
      {
        Disinfectant_name: 'Different Name',
        Approved_dilution_rate: '1:400'
      }
    ]

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      {
        Disinfectant_name: 'Test Disinfectant',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Different Name',
        Approved_dilution_rate: '1:400'
      }
    ])
  })

  it('should keep the first occurrence of duplicates', () => {
    const input = [
      {
        Disinfectant_name: 'Duplicate Name',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Unique Name',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: 'duplicate name',
        Approved_dilution_rate: '1:300'
      },
      {
        Disinfectant_name: 'Another Unique',
        Approved_dilution_rate: '1:400'
      },
      {
        Disinfectant_name: 'DUPLICATE NAME',
        Approved_dilution_rate: '1:500'
      }
    ]

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toHaveLength(3)
    expect(result).toEqual([
      {
        Disinfectant_name: 'Duplicate Name',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Unique Name',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: 'Another Unique',
        Approved_dilution_rate: '1:400'
      }
    ])
  })

  it('should handle complex whitespace and case combinations', () => {
    const input = [
      {
        Disinfectant_name: '  Complex Name  ',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'COMPLEX NAME',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: '\t complex name \n',
        Approved_dilution_rate: '1:300'
      },
      {
        Disinfectant_name: 'Different Name',
        Approved_dilution_rate: '1:400'
      }
    ]

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toHaveLength(2)
    expect(result[0].Disinfectant_name).toBe('  Complex Name  ') // Original formatting preserved
    expect(result[1].Disinfectant_name).toBe('Different Name')
  })

  it('should handle array with all valid unique items', () => {
    const input = [
      {
        Disinfectant_name: 'Name 1',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Name 2',
        Approved_dilution_rate: '1:200'
      },
      {
        Disinfectant_name: 'Name 3',
        Approved_dilution_rate: '1:300'
      }
    ]

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toEqual(input)
  })

  it('should handle mixed valid and invalid entries with duplicates', () => {
    const input = /** @type {any} */ ([
      {
        Disinfectant_name: 'Valid Name',
        Approved_dilution_rate: '1:100'
      },
      { Approved_dilution_rate: '1:200' }, // Invalid - no name
      {
        Disinfectant_name: 'valid name',
        Approved_dilution_rate: '1:300'
      }, // Duplicate
      {
        Disinfectant_name: null,
        Approved_dilution_rate: '1:400'
      }, // Invalid - null name
      {
        Disinfectant_name: 'Another Valid',
        Approved_dilution_rate: '1:500'
      },
      {
        Disinfectant_name: 'ANOTHER VALID',
        Approved_dilution_rate: '1:600'
      } // Duplicate
    ])

    const result = dedupeFilteredDisinfectants(input)

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      {
        Disinfectant_name: 'Valid Name',
        Approved_dilution_rate: '1:100'
      },
      {
        Disinfectant_name: 'Another Valid',
        Approved_dilution_rate: '1:500'
      }
    ])
  })
})
