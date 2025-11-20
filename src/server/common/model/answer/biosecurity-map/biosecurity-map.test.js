import { BiosecurityMapAnswer } from './biosecurity-map.js'

/**
 * @import { BiosecurityMapPayload, BiosecurityMapData } from './biosecurity-map.js'
 */

/** @type {BiosecurityMapData} */
const mockDataProcessing = {
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
const mockDataUploaded = {
  metadata: {
    uploadId: '12345',
    uploadUrl: 'http://example.com/upload',
    statusUrl: 'http://example.com/status'
  },
  status: {
    uploadStatus: 'ready',
    metadata: {},
    form: {
      crumb: 'crumb',
      file: {
        s3Key: 'biosecurity-map/some-key'
      }
    },
    numberOfRejectedFiles: 0
  }
}

/** @type {BiosecurityMapData} */
const mockDataSkipped = {
  ...mockDataUploaded,
  // @ts-expect-error uploadStatus is not assignable to 'skipped' for some reason
  status: {
    ...mockDataUploaded.status,
    uploadStatus: 'skipped'
  }
}

const skippedMessage =
  'Missing biosecurity map. Applicant needs to email it to csc.tblicensing@apha.gov.uk'

describe('BiosecurityAnswer', () => {
  it('should create an instance from state', () => {
    const answer = BiosecurityMapAnswer.fromState(mockDataUploaded)
    expect(answer).toBeInstanceOf(BiosecurityMapAnswer)
    expect(answer._data).toEqual(mockDataUploaded)
  })

  it('should return the correct value', () => {
    const answer = new BiosecurityMapAnswer(mockDataUploaded)
    const value = answer.value
    expect(value).toEqual(mockDataUploaded)
  })

  it('should return the correct HTML', () => {
    const answer = new BiosecurityMapAnswer(mockDataUploaded)
    const html = answer.html
    expect(html).toBe('Map uploaded')
  })

  it('should return the correct HTML when skipped', () => {
    const answer = new BiosecurityMapAnswer(mockDataSkipped)
    const html = answer.html
    expect(html).toBe(skippedMessage)
  })

  it('should convert to state correctly', () => {
    const answer = new BiosecurityMapAnswer(mockDataUploaded)
    const state = answer.toState()
    expect(state).toEqual(mockDataUploaded)
  })

  it('should extract fields correctly', () => {
    const answer = new BiosecurityMapAnswer(mockDataUploaded)
    const fields = answer._extractFields(mockDataUploaded)
    expect(fields).toEqual({
      metadata: mockDataUploaded.metadata,
      status: mockDataUploaded.status
    })
  })

  it('should return undefined for value if metadata is missing', () => {
    const answer = new BiosecurityMapAnswer({})
    expect(answer.value).toBeUndefined()
  })

  it('should identify status other than skipped correctly', () => {
    const answer = new BiosecurityMapAnswer(mockDataUploaded)
    expect(answer.isSkipped()).toBe(false)
  })

  it('should identify skipped status correctly', () => {
    const answer = new BiosecurityMapAnswer(mockDataSkipped)
    expect(answer.isSkipped()).toBe(true)
  })

  describe('validation', () => {
    describe('processing validation', () => {
      it('should pass validation for valid data', () => {
        const answer = new BiosecurityMapAnswer(mockDataProcessing)
        const { isValid } = answer.validateProcessing()
        expect(isValid).toBe(true)
      })

      it('should still pass validation when file s3Key is missing after upload', () => {
        const validData = /** @type {BiosecurityMapData} */ ({
          ...mockDataProcessing,
          status: {
            ...mockDataProcessing.status,
            uploadStatus: 'ready',
            form: {
              crumb: 'crumb',
              file: {
                // s3Key is missing
              }
            }
          }
        })
        const answer = new BiosecurityMapAnswer(validData)
        const { isValid } = answer.validateProcessing()
        expect(isValid).toBe(true)
      })
    })

    describe('standard validation', () => {
      it('should pass validation for valid data', () => {
        const answer = new BiosecurityMapAnswer(mockDataUploaded)
        const { isValid } = answer.validate()
        expect(isValid).toBe(true)
      })

      it('should fail validation when file s3Key is missing after upload', () => {
        const answer = new BiosecurityMapAnswer(mockDataProcessing)
        const { isValid } = answer.validate()
        expect(isValid).toBe(false)
      })
    })
  })
})
