import { TextAnswer } from '../text/text.js'
import { CphNumberAnswer } from './cph-number.js'
import { config } from '~/src/config/config.js'
import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'

const mockMatchCph = jest.fn()

jest.mock('../../../helpers/cph-matching/index.js', () => ({
  matchCph: (...args) => mockMatchCph(...args)
}))

const validPayload = {
  cphNumber: '12/456/7899'
}

describe('CphNumberAnswer', () => {
  it('should be a text input', () => {
    expect(new CphNumberAnswer(validPayload)).toBeInstanceOf(TextAnswer)
  })

  it('should have the right payload key', () => {
    expect(CphNumberAnswer.config.payloadKey).toBe('cphNumber')
  })

  it('should autocomplete', () => {
    expect(CphNumberAnswer.config.autocomplete).toBe('cph-number')
  })

  it('should strip whitespace', () => {
    expect(CphNumberAnswer.config.stripWhitespace).toBe(true)
  })

  it('should display with a char width of 10', () => {
    expect(CphNumberAnswer.config.characterWidth).toBe(10)
  })

  it('should have a hint', () => {
    expect(CphNumberAnswer.config.hint).toBe('For example, 12/345/6789')
  })

  describe('#CphNumberAnswer.validate', () => {
    it('should return true for valid cphNumber', () => {
      const cphNumber = new CphNumberAnswer(validPayload)
      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should return false for an empty input', () => {
      const cphNumber = new CphNumberAnswer()
      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(false)
      expect(errors.cphNumber.text).toBe(
        'Enter the farm or premises CPH number'
      )
    })

    it('should return false for malformed input', () => {
      const cphNumber = new CphNumberAnswer({
        cphNumber: '1/2/3'
      })

      const { isValid, errors } = cphNumber.validate()

      expect(isValid).toBe(false)
      expect(errors.cphNumber.text).toBe(
        'Enter the CPH number in the correct format, for example, 12/345/6789'
      )
    })
  })

  describe('#CphNumberAnswer.validateExternally', () => {
    const logger = /** @type {any} */ ({})

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should match the CPH with whitespace stripped', async () => {
      mockMatchCph.mockResolvedValueOnce('matched')

      await new CphNumberAnswer({
        cphNumber: ' 12/456 /7899 '
      }).validateExternally(logger)

      expect(mockMatchCph).toHaveBeenCalledWith('12/456/7899', logger)
    })

    it('should be valid when the CPH matches one known to SAM', async () => {
      mockMatchCph.mockResolvedValueOnce('matched')

      const { isValid, errors } = await new CphNumberAnswer(
        validPayload
      ).validateExternally(logger)

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should be invalid when the CPH does not match one known to SAM', async () => {
      mockMatchCph.mockResolvedValueOnce('not-matched')

      const { isValid, errors } = await new CphNumberAnswer(
        validPayload
      ).validateExternally(logger)

      expect(isValid).toBe(false)
      expect(errors.cphNumber.text).toBe(
        'The CPH number you entered cannot be found. Check the number and try again'
      )
    })

    it('should not match the CPH when the cphValidation feature flag is off', async () => {
      spyOnConfig('featureFlags', {
        ...config.get('featureFlags'),
        cphValidation: false
      })

      const { isValid, errors } = await new CphNumberAnswer(
        validPayload
      ).validateExternally(logger)

      expect(mockMatchCph).not.toHaveBeenCalled()
      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })

    it('should be valid when SAM is unavailable', async () => {
      mockMatchCph.mockResolvedValueOnce('unavailable')

      const { isValid, errors } = await new CphNumberAnswer(
        validPayload
      ).validateExternally(logger)

      expect(isValid).toBe(true)
      expect(errors).toEqual({})
    })
  })

  describe('#CphNumberAnswer.viewModel', () => {
    const question = 'What is the CPH number?'
    const unmatchedError = { text: 'The CPH number cannot be found' }

    it('should show the unmatched CPH error passed in when the CPH is well formed', async () => {
      const answer = new CphNumberAnswer(validPayload)

      const { errorMessage } = await answer.viewModel({
        validate: true,
        question,
        errors: { cphNumber: unmatchedError }
      })

      expect(errorMessage).toEqual(unmatchedError)
    })

    it('should show the format error over the error passed in', async () => {
      const answer = new CphNumberAnswer({ cphNumber: '12345' })

      const { errorMessage } = await answer.viewModel({
        validate: true,
        question,
        errors: { cphNumber: unmatchedError }
      })

      expect(errorMessage).toEqual({
        text: 'Enter the CPH number in the correct format, for example, 12/345/6789'
      })
    })

    it('should not show an error when not validating', async () => {
      const answer = new CphNumberAnswer(validPayload)

      const { errorMessage } = await answer.viewModel({
        validate: false,
        question,
        errors: { cphNumber: unmatchedError }
      })

      expect(errorMessage).toBeUndefined()
    })
  })
})
