import { runCphMatchingFromApplication } from './index.js'

const mockFindMatchingCphs = jest.fn()

jest.mock('../../apis/integration-bridge/index.js', () => ({
  findMatchingCphs: (...args) => mockFindMatchingCphs(...args)
}))

describe('CPH matching helper', () => {
  const TEST_APPLICATION_ID = 'TB-1234-5678'
  const TEST_CPHS = {
    origin: '12/345/6789',
    destination: '98/765/4321'
  }

  /**
   * @param {{ info?: any, debug?: any, error?: any }} [overrides]
   */
  const createMockLogger = (overrides = {}) => ({
    info: jest.fn(),
    debug: jest.fn(),
    ...overrides
  })

  /**
   * @param {{ payload: any, applicationId?: string, logger?: any }} options
   */
  const createTestContext = ({ payload, applicationId, logger }) => ({
    payload,
    applicationId: applicationId ?? TEST_APPLICATION_ID,
    logger: logger ?? createMockLogger()
  })

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('successful matching', () => {
    it('should log matches for both origin and destination CPHs', async () => {
      mockFindMatchingCphs.mockResolvedValueOnce(new Set([TEST_CPHS.origin]))

      const context = createTestContext({
        payload: {
          keyFacts: {
            originCph: TEST_CPHS.origin,
            destinationCph: TEST_CPHS.destination
          }
        }
      })

      await runCphMatchingFromApplication(context)

      expect(mockFindMatchingCphs).toHaveBeenCalledWith([
        TEST_CPHS.origin,
        TEST_CPHS.destination
      ])

      expect(context.logger.info).toHaveBeenCalledTimes(2)

      expect(context.logger.info).toHaveBeenNthCalledWith(
        1,
        {
          applicationId: TEST_APPLICATION_ID,
          applicationCph: TEST_CPHS.origin,
          cphMatchResult: true,
          cphType: 'origin'
        },
        'CPH match result'
      )

      expect(context.logger.info).toHaveBeenNthCalledWith(
        2,
        {
          applicationId: TEST_APPLICATION_ID,
          applicationCph: TEST_CPHS.destination,
          cphMatchResult: false,
          cphType: 'destination'
        },
        'CPH match result'
      )
    })
  })

  describe('error handling', () => {
    it('should log an error and continue when the CPH matching API fails', async () => {
      mockFindMatchingCphs.mockRejectedValueOnce(new Error('boom'))

      const context = createTestContext({
        payload: {
          keyFacts: {
            originCph: TEST_CPHS.origin
          }
        },
        logger: createMockLogger({ error: jest.fn() })
      })

      await runCphMatchingFromApplication(context)

      expect(context.logger.error).toHaveBeenCalledWith(
        {
          err: expect.any(Error),
          applicationId: TEST_APPLICATION_ID
        },
        'CPH API unavailable'
      )
    })

    it('should handle error when logger.error is undefined', async () => {
      mockFindMatchingCphs.mockRejectedValueOnce(new Error('boom'))

      const context = createTestContext({
        payload: {
          keyFacts: {
            originCph: TEST_CPHS.origin
          }
        }
      })

      await expect(
        runCphMatchingFromApplication(context)
      ).resolves.toBeUndefined()
    })

    it('should handle non-Error rejection', async () => {
      mockFindMatchingCphs.mockRejectedValueOnce('string error')

      const context = createTestContext({
        payload: {
          keyFacts: {
            originCph: TEST_CPHS.origin
          }
        },
        logger: createMockLogger({ error: jest.fn() })
      })

      await runCphMatchingFromApplication(context)

      expect(context.logger.error).toHaveBeenCalledWith(
        {
          err: expect.any(TypeError),
          applicationId: TEST_APPLICATION_ID
        },
        'CPH API unavailable'
      )
    })
  })

  describe('skipping scenarios', () => {
    it('should skip matching when there are no CPHs to match', async () => {
      const context = createTestContext({
        payload: {}
      })

      await runCphMatchingFromApplication(context)

      expect(mockFindMatchingCphs).not.toHaveBeenCalled()
    })

    it('should skip matching when keyFacts is undefined', async () => {
      const context = createTestContext({
        payload: { otherData: 'value' }
      })

      await runCphMatchingFromApplication(context)

      expect(mockFindMatchingCphs).not.toHaveBeenCalled()
      expect(context.logger.info).not.toHaveBeenCalled()
    })
  })
})
