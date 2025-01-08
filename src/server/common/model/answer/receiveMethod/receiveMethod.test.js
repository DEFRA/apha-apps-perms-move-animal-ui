import { ReceiveMethodAnswer } from './receiveMethod.js'

const validReceiveMethodPayload = {
  receiveMethod: 'email'
}

describe('#ReceiveMethod.validate', () => {
  it('should return true for valid receiveMethod', () => {
    const receiveMethod = new ReceiveMethodAnswer(validReceiveMethodPayload)
    const { isValid } = receiveMethod.validate()

    expect(isValid).toBe(true)
  })

  it('should return false for an empty input', () => {
    const receiveMethod = new ReceiveMethodAnswer({
      receiveMethod: 'invalid value'
    })

    const { isValid, errors } = receiveMethod.validate()

    expect(isValid).toBe(false)
    expect(errors.receiveMethod.text).toBe(
      'Select how you would like this licence sent to you'
    )
  })

  it('should return false for malformed input', () => {
    const receiveMethod = new ReceiveMethodAnswer({
      receiveMethod: 'unknown response'
    })

    const { isValid, errors } = receiveMethod.validate()

    expect(isValid).toBe(false)
    expect(errors.receiveMethod.text).toBe(
      'Select how you would like this licence sent to you'
    )
  })
})

describe('#ReceiveMethod.toState', () => {
  it('should replace missing data with blank string', () => {
    const receiveMethod = new ReceiveMethodAnswer()
    const data = receiveMethod.toState()

    expect(data).toBe('')
  })

  it('should pass through valid data unaltered', () => {
    const receiveMethod = new ReceiveMethodAnswer(validReceiveMethodPayload)
    const data = receiveMethod.toState()

    expect(data).toEqual(validReceiveMethodPayload.receiveMethod)
  })

  it('should remove whitespace', () => {
    const receiveMethod = new ReceiveMethodAnswer({
      receiveMethod: 'p o s t'
    })

    expect(receiveMethod.toState()).toBe('post')
  })
})

describe('#ReceiveMethod.fromState', () => {
  it('should return just the receiveMethod from the payload', () => {
    const receiveMethod = new ReceiveMethodAnswer(validReceiveMethodPayload)
    const state = receiveMethod.toState()
    expect(ReceiveMethodAnswer.fromState(state).value).toEqual(
      validReceiveMethodPayload.receiveMethod
    )
  })

  it('should return an undefined value if the state is undefined', () => {
    expect(ReceiveMethodAnswer.fromState(undefined).value).toBeUndefined()
  })

  it('should return an empty object if the state is undefined', () => {
    expect(ReceiveMethodAnswer.fromState(undefined)._data).toBeUndefined()
  })
})

describe('#ReceiveMethod.html', () => {
  it('should return the receiveMethod if present', () => {
    const receiveMethod = new ReceiveMethodAnswer(validReceiveMethodPayload)
    expect(receiveMethod.html).toBe(validReceiveMethodPayload.receiveMethod)
  })

  it('should return an empty string if receiveMethod is not present', () => {
    const receiveMethod = new ReceiveMethodAnswer()
    expect(receiveMethod.html).toBe('')
  })
})
