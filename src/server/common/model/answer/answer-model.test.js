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
})
