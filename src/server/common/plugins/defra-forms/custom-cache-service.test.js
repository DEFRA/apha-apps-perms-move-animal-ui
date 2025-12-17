import { describe, expect, jest, beforeEach } from '@jest/globals'
import { CustomCacheService } from './custom-cache-service.js'
import { CacheService } from '@defra/forms-engine-plugin/cache-service.js'
import { TbStateManager } from '~/src/server/tb/state-manager.js'
import { OriginSection } from '~/src/server/tb/origin/section.js'

/** @import {SectionModelV1} from '../../model/section/section-model/section-model-v1.js' */

jest.mock('@defra/forms-engine-plugin/cache-service.js', () => ({
  CacheService: class CacheService {
    setState() {
      return 'parent-result'
    }
  }
}))
jest.mock('~/src/server/tb/state-manager.js')
jest.mock('~/src/server/tb/origin/section.js')

describe('CustomCacheService', () => {
  let customCacheService
  let mockRequest
  let mockState
  let mockStateService
  let mockSection

  beforeEach(() => {
    jest.clearAllMocks()

    mockRequest = { id: 'test-request' }
    mockState = { data: 'test-state' }
    mockSection = {}

    mockStateService = {
      toState: jest.fn().mockReturnValue({ converted: 'state' }),
      setSection: jest.fn()
    }

    jest.mocked(TbStateManager).mockImplementation(() => mockStateService)
    jest
      .mocked(OriginSection)
      .fromRequest.mockResolvedValue(
        /** @type {SectionModelV1} */ (mockSection)
      )
    jest
      .spyOn(CacheService.prototype, 'setState')
      .mockResolvedValue('parent-result')

    const mockServer = /** @type {any} */ ({})
    customCacheService = new CustomCacheService({ server: mockServer })
  })

  it('should extend CacheService', () => {
    expect(customCacheService).toBeInstanceOf(CacheService)
  })

  it('should have StateService property set to TbStateManager', () => {
    expect(customCacheService.StateService).toBe(TbStateManager)
  })

  describe('setState', () => {
    it('should call parent setState with request and state', async () => {
      await customCacheService.setState(mockRequest, mockState)

      expect(CacheService.prototype.setState).toHaveBeenCalledWith(
        mockRequest,
        mockState
      )
    })

    it('should make the correct subsequent calls and return result from parent setState', async () => {
      const result = await customCacheService.setState(mockRequest, mockState)

      expect(TbStateManager).toHaveBeenCalledWith(mockRequest)
      expect(OriginSection.fromRequest).toHaveBeenCalledWith(mockRequest, {
        converted: 'state'
      })
      expect(mockStateService.toState).toHaveBeenCalled()
      expect(mockStateService.setSection).toHaveBeenCalledWith(mockSection)
      expect(result).toBe('parent-result')
    })
  })
})
