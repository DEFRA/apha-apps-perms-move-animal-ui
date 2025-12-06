import { SectionModelV2 } from './section-model-v2.js'
import { TerminalPageController } from '@defra/forms-engine-plugin/controllers/index.js'
import {
  getFirstJourneyPage,
  getFormContext,
  mapFormContextToAnswers
} from '../../../plugins/defra-forms/form-context.js'

jest.mock('../../../plugins/defra-forms/form-context.js')

const testPath = '/test-path'
const journeyPrefix = '/journey'
const fullTestPath = `${journeyPrefix}${testPath}`
const mockRequest = /** @type {any} */ ({})
const mockState = /** @type {any} */ ({})
const journeySlug = 'test-journey'

const mockFirstPage = {
  path: testPath,
  getHref: jest.fn((path) => `${journeyPrefix}${path}`)
}

describe('SectionModelV2', () => {
  let mockFormContext
  let mockConfig
  let TestSection

  beforeEach(() => {
    mockFormContext = {
      errors: [],
      relevantPages: [],
      config: mockConfig
    }
    mockConfig = {
      key: 'test-section',
      title: 'Test Section',
      summaryLink: '/summary',
      isEnabled: jest.fn().mockResolvedValue(true),
      isVisible: jest.fn().mockResolvedValue(true)
    }

    TestSection = class extends SectionModelV2 {
      static journeySlug = journeySlug
      static config = mockConfig
    }

    jest.mocked(getFirstJourneyPage).mockReturnValue(mockFirstPage)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    it('should create section with form context data', () => {
      const section = new SectionModelV2(mockFormContext)
      expect(section._data).toBe(mockFormContext)
    })
  })

  describe('validate', () => {
    it('should return valid when no errors and no terminal page', () => {
      const section = new SectionModelV2(mockFormContext)
      const result = section.validate()

      expect(result).toEqual({ isValid: true })
    })

    it('should return invalid when errors exist', () => {
      mockFormContext.errors = ['Error 1']
      const section = new SectionModelV2(mockFormContext)
      const result = section.validate()

      expect(result).toEqual({
        isValid: false,
        firstInvalidPageUrl: fullTestPath
      })
      expect(mockFirstPage.getHref).toHaveBeenCalledWith(testPath)
    })

    it('should return invalid when final page is terminal and return url of first page', () => {
      const terminalPage = new TerminalPageController({})
      mockFormContext.relevantPages = [mockFirstPage, terminalPage]
      const section = new SectionModelV2(mockFormContext)
      const result = section.validate()

      expect(result).toEqual({
        isValid: false,
        firstInvalidPageUrl: fullTestPath
      })
    })
  })

  describe('fromRequest', () => {
    it('should create section from request', async () => {
      jest.mocked(getFormContext).mockResolvedValue(mockFormContext)

      const result = await TestSection.fromRequest(mockRequest, mockState)

      expect(getFormContext).toHaveBeenCalledWith(mockRequest, journeySlug)
      expect(result).toBeInstanceOf(TestSection)
      expect(result._data).toBe(mockFormContext)
    })
  })

  describe('sectionData', () => {
    it('should return section data with question answers', () => {
      const mockAnswers = [
        { question: 'Q1', questionKey: 'q1', answer: 'A1' },
        { question: 'Q2', questionKey: 'q2', answer: 'A2' }
      ]
      jest.mocked(mapFormContextToAnswers).mockReturnValue(mockAnswers)

      const section = new TestSection(mockFormContext)
      const result = section.sectionData

      expect(result).toEqual({
        sectionKey: 'test-section',
        title: 'Test Section',
        questionAnswers: mockAnswers
      })
      expect(mapFormContextToAnswers).toHaveBeenCalledWith(mockFormContext)
    })
  })

  describe('summaryViewModel', () => {
    it('should return summary view model with formatted answers', () => {
      const redirectUri = '/return-url'
      const mockAnswers = [
        {
          question: 'Question 1',
          questionKey: 'q1',
          slug: '/q1',
          answer: { displayText: 'Answer 1' }
        },
        {
          question: 'Question 2',
          questionKey: 'q2',
          slug: '/q2',
          answer: { displayText: 'Answer 2' }
        }
      ]
      jest.mocked(mapFormContextToAnswers).mockReturnValue(mockAnswers)

      const section = new TestSection(mockFormContext)
      const result = section.summaryViewModel(mockRequest, redirectUri)

      expect(result).toEqual([
        {
          key: 'Question 1',
          value: 'Answer 1',
          url: '/q1?returnUrl=/return-url',
          attributes: { 'data-testid': 'q1-change-link' }
        },
        {
          key: 'Question 2',
          value: 'Answer 2',
          url: '/q2?returnUrl=/return-url',
          attributes: { 'data-testid': 'q2-change-link' }
        }
      ])
    })
  })

  describe('taskDetailsViewModel', () => {
    it('should return task details view model when valid', async () => {
      const section = new TestSection(mockFormContext)

      const result = await section.taskDetailsViewModel(mockRequest, mockState)

      expect(result).toEqual({
        title: 'Test Section',
        initialLink: '/journey/test-path',
        summaryLink: '/summary',
        isValid: true,
        isEnabled: true
      })
      expect(mockConfig.isEnabled).toHaveBeenCalledWith(mockState, mockRequest)
    })

    it('should return task details view model when invalid', async () => {
      mockFormContext.errors = ['Error']

      const section = new TestSection(mockFormContext)

      const result = await section.taskDetailsViewModel(mockRequest, mockState)

      expect(result.isValid).toBe(false)
    })

    it('should handle disabled sections', async () => {
      mockConfig.isEnabled.mockResolvedValue(false)

      const section = new TestSection(mockFormContext)

      const result = await section.taskDetailsViewModel(mockRequest, mockState)

      expect(result.isEnabled).toBe(false)
    })
  })
})
