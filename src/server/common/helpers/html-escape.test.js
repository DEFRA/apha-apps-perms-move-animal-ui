import { escapeHtml } from './html-escape.js'

describe('escapeHtml', () => {
  it('should escape less-than signs', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
  })

  it('should escape greater-than signs', () => {
    expect(escapeHtml('1 > 0')).toBe('1 &gt; 0')
  })

  it('should escape a combination of special characters', () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
      '&lt;script&gt;alert("XSS")&lt;/script&gt;'
    )
  })

  it('should return the same string if no special characters are present', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World')
  })
})
