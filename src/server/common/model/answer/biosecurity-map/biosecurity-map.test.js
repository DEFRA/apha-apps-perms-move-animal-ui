import { BiosecurityMapAnswer } from './biosecurity-map.js'

/**
 * @import { BiosecurityMapPayload, BiosecurityMapData } from './biosecurity-map.js'
 */

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

/** @type {BiosecurityMapData} */
const mockSkippedData = {
  ...mockData,
  // @ts-expect-error uploadStatus is not assignable to 'skipped' for some reason
  status: {
    ...mockData.status,
    uploadStatus: 'skipped'
  }
}

const skippedMessage =
  'Missing biosecurity map. Applicant needs to email it to csc.tblicensing@apha.gov.uk'

describe('BiosecurityAnswer', () => {
  it('should create an instance from state', () => {
    const answer = BiosecurityMapAnswer.fromState(mockData)
    expect(answer).toBeInstanceOf(BiosecurityMapAnswer)
    expect(answer._data).toEqual(mockData)
  })

  it('should return the correct value', () => {
    const answer = new BiosecurityMapAnswer(mockData)
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
    const answer = new BiosecurityMapAnswer(mockData)
    const html = answer.html
    expect(html).toBe('Map uploaded')
  })

  it('should return the correct HTML when skipped', () => {
    const answer = new BiosecurityMapAnswer(mockSkippedData)
    const html = answer.html
    expect(html).toBe(skippedMessage)
  })

  it('should convert to state correctly', () => {
    const answer = new BiosecurityMapAnswer(mockData)
    const state = answer.toState()
    expect(state).toEqual(mockData)
  })

  it('should validate correctly', () => {
    const answer = new BiosecurityMapAnswer(mockData)
    const { isValid } = answer.validate()
    expect(isValid).toBe(true)
  })

  it('should extract fields correctly', () => {
    const answer = new BiosecurityMapAnswer(mockData)
    const fields = answer._extractFields(mockData)
    expect(fields).toEqual({
      metadata: mockData.metadata,
      status: mockData.status
    })
  })

  it('should return undefined for value if metadata is missing', () => {
    const answer = new BiosecurityMapAnswer({})
    expect(answer.value).toBeUndefined()
  })

  it('should return empty emailHtml when not skipped', () => {
    const answer = new BiosecurityMapAnswer(mockData)
    expect(answer.emailHtml).toBe('')
  })

  it('should return correct emailHtml when skipped', () => {
    const answer = new BiosecurityMapAnswer(mockSkippedData)
    expect(answer.emailHtml).toBe(skippedMessage)
  })

  it('should identify status other than skipped correctly', () => {
    const answer = new BiosecurityMapAnswer(mockData)
    expect(answer.isSkipped()).toBe(false)
  })

  it('should identify skipped status correctly', () => {
    const answer = new BiosecurityMapAnswer(mockSkippedData)
    expect(answer.isSkipped()).toBe(true)
  })
})
