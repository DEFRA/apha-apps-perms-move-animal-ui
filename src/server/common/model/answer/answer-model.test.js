import { AnswerModel } from './answer-model.js'

describe('AnswerModel', () => {
  const notImplementedError = 'Not Implemented'
  let answer

  beforeEach(() => {
    answer = new AnswerModel()
  })

  it('should throw NotImplementedError when value getter is called', () => {
    expect(() => answer.value).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when html getter is called', () => {
    expect(() => answer.html()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when toState is called', () => {
    expect(() => answer.toState()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when validate is called', () => {
    expect(() => answer.validate()).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => AnswerModel.fromState({})).toThrow(notImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    class AnswerModelBasic extends AnswerModel {
      _extractFields(data) {
        return data
      }
    }
    answer = new AnswerModelBasic({ key: 'value' })

    expect(() => {
      answer.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete answer._data
    }).toThrow()
  })

  it('should provide a default error message converter', () => {
    const error = 'Enter address line 1, typically the building and street'

    const errors = {
      addressLine1: { text: error }
    }
    expect(AnswerModel.errorMessages(errors)).toEqual([
      {
        text: error,
        href: '#addressLine1'
      }
    ])
  })
})
