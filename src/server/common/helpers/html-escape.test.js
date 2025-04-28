import { escapeHtml } from './html-escape.js'

describe('escapeHtml', () => {
  it('should return the same string if no special characters are present', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World')
  })

  it('should escape less-than signs', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
  })

  it('should escape greater-than signs', () => {
    expect(escapeHtml('1 > 0')).toBe('1 &gt; 0')
  })

  it('should escape ampersands', () => {
    expect(escapeHtml('Fish & Chips')).toBe('Fish &amp; Chips')
  })

  it('should escape double quotes', () => {
    expect(escapeHtml('He said "Hello"')).toBe('He said &quot;Hello&quot;')
  })

  it('should escape single quotes', () => {
    expect(escapeHtml("It's a test")).toBe('It&#39;s a test')
  })

  it('should escape a combination of special characters', () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
    )
  })

  it('should handle null or undefined input gracefully', () => {
    expect(escapeHtml(null)).toBeUndefined()
    expect(escapeHtml(undefined)).toBeUndefined()
  })
})
