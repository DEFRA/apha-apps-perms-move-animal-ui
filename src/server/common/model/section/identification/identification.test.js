import { EarTagsPage } from '~/src/server/identification/ear-tags/index.js'
import { IdentificationSection } from './identification.js'

const validIdentificationData = {
  earTags: 'test-ear-tag-content'
}

const invalidIdentificationData = {
  earTags: undefined
}

describe('Identification.validate', () => {
  it('should return valid if all nested objects are valid', () => {
    const identificationData = validIdentificationData
    const result = IdentificationSection.fromState({
      identification: identificationData
    }).validate()

    expect(result.isValid).toBe(true)
  })

  it('should return invalid if any nested object is invalid', () => {
    const result = IdentificationSection.fromState({
      identification: invalidIdentificationData
    }).validate()

    expect(result.isValid).toBe(false)
    expect(result.firstInvalidPage).toBeInstanceOf(EarTagsPage)
  })
})

describe('Identification.config', () => {
  it('should be as expected', () => {
    expect(IdentificationSection.config.key).toBe('identification')
    expect(IdentificationSection.config.title).toBe('Animal identifiers')
    expect(IdentificationSection.config.isVisible).toBe(true)
    expect(IdentificationSection.config.isEnabled({})).toBe(true)
    expect(IdentificationSection.config.summaryLink).toBe(
      '/identification/check-answers'
    )
  })
})
