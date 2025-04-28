import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { AnswerModel } from './answer-model.js'

class AnswerModelBasic extends AnswerModel {
  _extractFields(data) {
    return data
  }
}

describe('AnswerModel', () => {
  const notImplementedError = 'Not Implemented'
  const answer = new AnswerModel()

  it('should store answer data & application state context', () => {
    const answerValue = 'My answer'
    const applicationState = {
      origin: { originType: 'afu' }
    }
    const answer = new AnswerModelBasic(answerValue, applicationState)

    expect(answer._data).toBe(answerValue)
    expect(answer._context).toEqual(applicationState)
  })

  it("should default to undefined if values aren't passed to constructor", () => {
    const answer = new AnswerModelBasic()

    expect(answer._data).toBeUndefined()
    expect(answer._context).toBeUndefined()
  })

  it('should throw NotImplementedError when value getter is called', () => {
    expect(() => answer.value).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when html getter is called', () => {
    expect(() => answer.html).toThrow(notImplementedError)
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

  it('should throw NotImplementedError when viewModel is called', () => {
    expect(() =>
      answer.viewModel({ validate: true, question: 'What is the answer?' })
    ).toThrow(notImplementedError)
  })

  it('should throw NotImplementedError when template is accessed', () => {
    expect(() => answer.template).toThrow(NotImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    const answer = /** @type {any} */ (new AnswerModelBasic({ key: 'value' }))

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

  it('should return escaped markdown of the html content', () => {
    const unsafeContent = '[evil-link](example.com)'
    const escapedContent = '\\[evil-link\\]\\(example.com\\)'

    class AnswerModelWithHtml extends AnswerModel {
      get html() {
        return unsafeContent
      }
    }

    expect(new AnswerModelWithHtml().emailHtml).toBe(escapedContent)
  })

  it('should throw NotImplementedError if html getter is not implemented', () => {
    expect(() => answer.emailHtml).toThrow(NotImplementedError)
  })
})
