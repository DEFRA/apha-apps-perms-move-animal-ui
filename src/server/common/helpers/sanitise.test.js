import { sanitiseObject, sanitiseValue } from './sanitise.js'
import sanitizeHtml from 'sanitize-html'

jest.mock('sanitize-html')

describe('sanitiseValue', () => {
  it('should remove all HTML tags and attributes from the input string', () => {
    const input = '<div>Hello <b>World</b></div>'

    const result = sanitiseValue(input)
    expect(result).toBeUndefined()
    expect(sanitizeHtml).toHaveBeenCalledWith(input, {
      allowedTags: [],
      allowedAttributes: {}
    })
  })

  it('should return undefined if the input is an empty string', () => {
    const input = ''

    const result = sanitiseValue(input)
    expect(result).toBeUndefined()
  })
})

describe('sanitiseObject', () => {
  it('should sanitise all values in the object', () => {
    const input = {
      key1: '<div>Value1</div>',
      key2: '<span>Value2</span>'
    }
    const expectedOutput = {
      key1: undefined,
      key2: undefined
    }

    const result = sanitiseObject(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should return an empty array if the input object is null or undefined', () => {
    expect(sanitiseObject(null)).toEqual({})
    expect(sanitiseObject(undefined)).toEqual({})
  })

  it('should handle an empty object correctly', () => {
    const input = {}
    const expectedOutput = {}

    const result = sanitiseObject(input)
    expect(result).toEqual(expectedOutput)
  })
})
