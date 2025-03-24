import { defraId } from './defra-id.js'
import Wreck from '@hapi/wreck'
import jwt from '@hapi/jwt'
import bell from '@hapi/bell'
import { spyOnConfig } from '../../test-helpers/config.js'

jest.mock('@hapi/wreck')
jest.mock('@hapi/jwt')
jest.mock('@hapi/bell')

describe('defraId plugin', () => {
  let server
  const configValues = {
    auth: {
      defraIdOidcConfigurationUrl:
        'https://example.com/.well-known/openid-configuration',
      defraIdServiceId: 'service-id',
      defraIdClientId: 'client-id',
      defraIdClientSecret: 'client-secret'
    },
    appBaseUrl: 'https://app.example.com',
    'session.cookie.password': 'cookie-password'
  }

  beforeEach(() => {
    server = {
      register: jest.fn(),
      auth: {
        strategy: jest.fn()
      }
    }

    Wreck.get = jest.fn().mockResolvedValue({
      payload: JSON.stringify({
        authorization_endpoint: 'https://example.com/auth',
        token_endpoint: 'https://example.com/token',
        end_session_endpoint: 'https://example.com/logout'
      })
    })

    jwt.token.decode = jest.fn().mockReturnValue({
      decoded: {
        payload: {
          sub: 'user-id',
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    })
  })

  it('should register the bell plugin', async () => {
    spyOnConfig('auth', configValues.auth)
    await defraId.plugin.register(server)
    expect(server.register).toHaveBeenCalledWith(bell)
  })

  it('should configure the auth strategy with correct oidcConf', async () => {
    spyOnConfig('auth', configValues.auth)
    await defraId.plugin.register(server)
    expect(Wreck.get).toHaveBeenCalledWith(
      'https://example.com/.well-known/openid-configuration'
    )
    expect(server.auth.strategy).toHaveBeenCalledWith(
      'defra-id',
      'bell',
      expect.objectContaining({
        provider: expect.objectContaining({
          auth: 'https://example.com/auth',
          token: 'https://example.com/token'
        })
      })
    )
  })

  it('should correctly parse and use oidcConf', async () => {
    spyOnConfig('auth', configValues.auth)
    await defraId.plugin.register(server)
    const strategyConfig = server.auth.strategy.mock.calls[0][2]
    const profile = strategyConfig.provider.profile

    const credentials = { token: 'jwt-token' }
    const params = { id_token: 'id-token' }
    profile(credentials, params)

    expect(credentials.profile).toEqual(
      expect.objectContaining({
        id: 'user-id',
        displayName: 'John Doe',
        idToken: 'id-token',
        tokenUrl: 'https://example.com/token',
        logoutUrl: 'https://example.com/logout'
      })
    )
  })
})
