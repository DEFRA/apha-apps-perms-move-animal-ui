import { BiosecurityAnswer } from './biosecurity-map.js'

/**
 * @import { BiosecurityMapData } from './biosecurity-map.js'
 */

describe('BiosecurityAnswer', () => {
  /** @type {BiosecurityMapData} */
  const mockData = {
    metadata: {
      uploadId: '12345',
      uploadUrl: 'http://example.com/upload',
      statusUrl: 'http://example.com/status'
    },
    status: {
      uploadStatus: 'initiated',
      metadata: {},
      form: {
        crumb: 'crumb',
        file: {}
      },
      numberOfRejectedFiles: 0
    }
  }

  it('should create an instance from state', () => {
    const answer = BiosecurityAnswer.fromState(mockData)
    expect(answer).toBeInstanceOf(BiosecurityAnswer)
    expect(answer._data).toEqual(mockData)
  })

  it('should return the correct value', () => {
    const answer = new BiosecurityAnswer(mockData)
    const value = answer.value
    expect(value).toEqual({
      metadata: {
        uploadId: '12345',
        uploadUrl: 'http://example.com/upload',
        statusUrl: 'http://example.com/status'
      },
      status: {
        form: {
          crumb: 'crumb',
          file: {}
        },
        metadata: {},
        numberOfRejectedFiles: 0,
        uploadStatus: 'initiated'
      }
    })
  })

  it('should return the correct HTML', () => {
    const answer = new BiosecurityAnswer(mockData)
    const html = answer.html
    expect(html).toBe('biosecurity html')
  })

  it('should convert to state correctly', () => {
    const answer = new BiosecurityAnswer(mockData)
    const state = answer.toState()
    expect(state).toEqual(mockData)
  })

  it('should validate correctly', () => {
    const answer = new BiosecurityAnswer(mockData)
    const { isValid } = answer.validate()
    expect(isValid).toBe(true)
  })

  it('should extract fields correctly', () => {
    const answer = new BiosecurityAnswer(mockData)
    const fields = answer._extractFields(mockData)
    expect(fields).toEqual({
      metadata: mockData.metadata,
      status: mockData.status
    })
  })
})
