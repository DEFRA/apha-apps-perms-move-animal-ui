import { AnswerModel } from './answer-model.js'

describe('AnswerModel', () => {
  const notImplementedError = 'Not implemented'
  let answer

  beforeEach(() => {
    answer = new AnswerModel()
  })

  it('should throw NotImplementedError when value getter is called', () => {
    expect(() => answer.value).toThrow(notImplementedError)
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
    answer = new AnswerModel({ key: 'value' })

    expect(() => {
      answer.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete answer._data
    }).toThrow()
  })
})
