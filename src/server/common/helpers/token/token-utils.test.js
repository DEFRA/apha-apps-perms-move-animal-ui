import { createToken, secrets } from './token-utils.js'
import { token } from '@hapi/jwt'

jest.mock('@hapi/jwt', () => ({
  token: {
    generate: jest.fn()
  }
}))

describe('token-utils', () => {
  const apiKey =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const secret = apiKey.substring(apiKey.length - 36, apiKey.length)
  const iss = apiKey.substring(apiKey.length - 73, apiKey.length - 37)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should generate a token with correct payload and options', () => {
    const iat = Math.round(Date.now() / 1000)
    const expectedPayload = { iss, iat }
    const expectedOptions = {
      header: { typ: 'JWT', alg: 'HS256' }
    }

    createToken(apiKey)

    expect(token.generate).toHaveBeenCalledWith(
      expectedPayload,
      secret,
      expectedOptions
    )
  })

  it('should correctly extract secret and iss from apiKey', () => {
    const { iss: extractedIss, secret: extractedSecret } = secrets(apiKey)

    expect(extractedIss).toBe(iss)
    expect(extractedSecret).toBe(secret)
  })
})
