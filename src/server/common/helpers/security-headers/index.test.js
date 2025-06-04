import { addSecurityHeaders } from './index.js'

const h = { continue: 'mock-continue' }
const uuid = 'test-uuid'

describe('addSecurityHeaders', () => {
  it('should add correct Content-Security-Policy header', () => {
    const headerMock = jest.fn()
    const request = {
      app: { uuid },
      response: {
        header: headerMock
      }
    }

    const result = addSecurityHeaders(request, h)

    expect(headerMock).toHaveBeenCalledWith(
      'Content-Security-Policy',
      `default-src 'self'; img-src 'self' https://www.nationalarchives.gov.uk/; script-src 'nonce-${uuid}' 'strict-dynamic'; frame-ancestors 'none';`
    )
    expect(result).toBe(h.continue)
  })

  it('should still return h.continue if header method is not present', () => {
    const request = {
      app: { uuid },
      response: {}
    }
    const result = addSecurityHeaders(request, h)
    expect(result).toBe(h.continue)
  })
})
