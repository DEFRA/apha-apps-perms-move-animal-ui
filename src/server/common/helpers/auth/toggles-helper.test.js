import { spyOnConfig } from '../../test-helpers/config.js'
import { getAuthOptions } from './toggles-helper.js'

describe('getAuthOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return { auth: false } when skipAuth is true', () => {
    const result = getAuthOptions(true)
    expect(result).toEqual({ auth: false })
  })

  it('should return undefined when authEnabled is false', () => {
    spyOnConfig('featureFlags', { authEnabled: false, authRequired: false })

    const result = getAuthOptions(false)
    expect(result).toBeUndefined()
  })

  it('should return auth strategy as session and mode as optional when authEnabled is true and authRequired is false', () => {
    spyOnConfig('featureFlags', { authEnabled: true, authRequired: false })

    const result = getAuthOptions(false)
    expect(result).toEqual({
      auth: {
        strategy: 'session',
        mode: 'optional'
      }
    })
  })

  it('should return auth strategy as session and mode as required when authEnabled is true and authRequired is true', () => {
    spyOnConfig('featureFlags', { authEnabled: true, authRequired: true })

    const result = getAuthOptions(false)
    expect(result).toEqual({
      auth: {
        strategy: 'session',
        mode: 'required'
      }
    })
  })
})
