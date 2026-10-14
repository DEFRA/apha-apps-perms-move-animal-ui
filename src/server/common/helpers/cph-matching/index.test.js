import { matchCph } from './index.js'

const mockFindMatchingCphs = jest.fn()

jest.mock('../../apis/integration-bridge/index.js', () => ({
  findMatchingCphs: (...args) => mockFindMatchingCphs(...args)
}))

const cph = '12/345/6789'

const createMockLogger = () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
})

describe('matchCph', () => {
  /** @type {any} */
  let logger

  beforeEach(() => {
    logger = createMockLogger()
  })

  describe('when SAM returns a match', () => {
    it('should return matched and log the successful match', async () => {
      mockFindMatchingCphs.mockResolvedValueOnce(new Set([cph]))

      await expect(matchCph(cph, logger)).resolves.toBe('matched')

      expect(mockFindMatchingCphs).toHaveBeenCalledWith([cph])
      expect(logger.info).toHaveBeenCalledWith(
        `CPH match result: cph=${cph} matched=true`
      )
      expect(logger.error).not.toHaveBeenCalled()
    })
  })

  describe('when SAM returns no match', () => {
    it('should return not-matched and log the unsuccessful match', async () => {
      mockFindMatchingCphs.mockResolvedValueOnce(new Set(['98/765/4321']))

      await expect(matchCph(cph, logger)).resolves.toBe('not-matched')

      expect(logger.info).toHaveBeenCalledWith(
        `CPH match result: cph=${cph} matched=false`
      )
      expect(logger.error).not.toHaveBeenCalled()
    })
  })

  describe('when SAM is unavailable', () => {
    it('should retry once and return the result of the retry', async () => {
      mockFindMatchingCphs
        .mockRejectedValueOnce(new Error('boom'))
        .mockResolvedValueOnce(new Set([cph]))

      await expect(matchCph(cph, logger)).resolves.toBe('matched')

      expect(mockFindMatchingCphs).toHaveBeenCalledTimes(2)
      expect(logger.warn).toHaveBeenCalledWith(
        { err: new Error('boom') },
        `CPH match attempt 1 of 2 failed: cph=${cph}`
      )
      expect(logger.error).not.toHaveBeenCalled()
    })

    it('should return unavailable and log an error once the retry fails', async () => {
      const error = new Error('boom')
      mockFindMatchingCphs.mockRejectedValue(error)

      await expect(matchCph(cph, logger)).resolves.toBe('unavailable')

      expect(mockFindMatchingCphs).toHaveBeenCalledTimes(2)
      expect(logger.warn).toHaveBeenCalledTimes(2)
      expect(logger.error).toHaveBeenCalledWith(
        { err: error },
        `CPH API unavailable: cph=${cph}`
      )
      expect(logger.info).not.toHaveBeenCalled()
    })

    it('should wrap non-Error rejections in an Error when logging', async () => {
      mockFindMatchingCphs.mockRejectedValue('string error')

      await expect(matchCph(cph, logger)).resolves.toBe('unavailable')

      expect(logger.error).toHaveBeenCalledWith(
        { err: expect.any(TypeError) },
        `CPH API unavailable: cph=${cph}`
      )
    })
  })
})
