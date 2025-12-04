import { describe, test, expect } from '@jest/globals'
import { SectionModel } from './section-model.js'
import { NotImplementedError } from '../../../helpers/not-implemented-error.js'

const mockRequest = /** @type {any} */ ({})

describe('SectionModel', () => {
  describe('constructor', () => {
    it('should initialize with provided data', () => {
      const data = []
      const section = new SectionModel(data)
      expect(section._data).toEqual(data)
    })
  })

  describe('config getter', () => {
    it('should return static config from constructor', () => {
      const mockConfig = {
        key: 'test-section',
        title: 'Test Section',
        summaryLink: '/test',
        isEnabled: () => true,
        isVisible: () => true
      }

      class TestSection extends SectionModel {
        static config = mockConfig
      }

      const section = new TestSection([])
      expect(section.config).toEqual(mockConfig)
    })
  })

  describe('validate', () => {
    it('should throw NotImplementedError', () => {
      const section = new SectionModel([])
      expect(() => section.validate()).toThrow(NotImplementedError)
    })
  })

  describe('taskDetailsViewModel', () => {
    it('should throw NotImplementedError', async () => {
      const section = new SectionModel([])
      await expect(
        section.taskDetailsViewModel(mockRequest, {})
      ).rejects.toThrow(NotImplementedError)
    })
  })

  describe('fromRequest', () => {
    it('should throw NotImplementedError', async () => {
      await expect(SectionModel.fromRequest(mockRequest, {})).rejects.toThrow(
        NotImplementedError
      )
    })
  })

  describe('sectionData getter', () => {
    it('should throw NotImplementedError', () => {
      const section = new SectionModel([])
      expect(() => section.sectionData).toThrow(NotImplementedError)
    })
  })

  describe('summaryViewModel', () => {
    it('should throw NotImplementedError', () => {
      const section = new SectionModel([])
      expect(() => section.summaryViewModel(mockRequest, '/redirect')).toThrow(
        NotImplementedError
      )
    })
  })
})
