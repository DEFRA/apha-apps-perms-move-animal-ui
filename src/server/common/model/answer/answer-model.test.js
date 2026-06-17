import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { AnswerModel } from './answer-model.js'

class AnswerModelBasic extends AnswerModel {
  _extractFields(data) {
    return data
  }
}

class AnswerModelWithDisplayText extends AnswerModelBasic {
  get displayText() {
    return this._data ?? ''
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

  it('should throw NotImplementedError when displayText getter is called', () => {
    expect(() => answer.displayText).toThrow(notImplementedError)
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

  it('should return a default empty view model if no override is given', async () => {
    expect(
      await answer.viewModel({
        validate: true,
        question: 'What is the answer?'
      })
    ).toEqual({})
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
})

describe('AnswerModel.html', () => {
  it('should return the displayText value', () => {
    const answer = new AnswerModelWithDisplayText('plain text')
    expect(answer.html).toBe('plain text')
  })

  it('should return an empty string when displayText is empty', () => {
    const answer = new AnswerModelWithDisplayText('')
    expect(answer.html).toBe('')
  })

  it('should escape HTML characters in displayText', () => {
    const answer = new AnswerModelWithDisplayText(
      '<script>alert("XSS")</script>'
    )
    expect(answer.html).toBe(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
    )
  })

  it('should escape special characters in displayText', () => {
    const answer = new AnswerModelWithDisplayText(
      'Test & \'quotes\' "and" more'
    )
    expect(answer.html).toBe('Test &amp; &#39;quotes&#39; &quot;and&quot; more')
  })

  it('should replace newlines with <br />', () => {
    const answer = new AnswerModelWithDisplayText('line one\nline two')
    expect(answer.html).toBe('line one<br />line two')
  })

  it('should replace carriage return + newline with <br />', () => {
    const answer = new AnswerModelWithDisplayText('line one\r\nline two')
    expect(answer.html).toBe('line one<br />line two')
  })

  it('should escape HTML and replace newlines', () => {
    const answer = new AnswerModelWithDisplayText(
      '<script>alert("XSS")</script>\nline two'
    )
    expect(answer.html).toBe(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;<br />line two'
    )
  })

  it('should throw NotImplementedError when displayText is not implemented', () => {
    const answer = new AnswerModel()
    expect(() => answer.html).toThrow('Not Implemented')
  })
})
