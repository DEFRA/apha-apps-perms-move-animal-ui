import { config } from '~/src/config/config.js'
import { provideProxy } from '~/src/server/common/helpers/proxy.js'

const mockLoggerDebug = jest.fn()
jest.mock('~/src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({ debug: (...args) => mockLoggerDebug(...args) })
}))

const httpProxyUrl = 'http://proxy.example.com'
const httpsProxyUrl = 'https://proxy.example.com'
const httpPort = 80
const httpsPort = 443

describe('#provideProxy', () => {
  describe('When a Proxy URL has not been set', () => {
    test('Should return null', () => {
      config.set('httpProxy', null)
      config.set('httpsProxy', null)
      expect(provideProxy()).toBeNull()
    })
  })

  describe('When a HTTP Proxy URL has been set', () => {
    let result

    beforeEach(() => {
      config.set('httpProxy', httpProxyUrl)
      result = provideProxy()
    })

    test('Should make expected set up message', () => {
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        `Proxy set up using ${httpProxyUrl}:${httpPort}`
      )
    })

    test('Should set the correct port for HTTP', () => {
      expect(result).toHaveProperty('port', httpPort)
    })

    test('Should return expected HTTP Proxy object', () => {
      expect(result).toHaveProperty('url')
      expect(result).toHaveProperty('proxyAgent')
      expect(result).toHaveProperty('httpAndHttpsProxyAgent')
    })
  })

  describe('When a HTTPS Proxy URL has been set', () => {
    let result

    beforeEach(() => {
      config.set('httpsProxy', httpsProxyUrl)
      result = provideProxy()
    })

    test('Should call debug with expected message', () => {
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        `Proxy set up using ${httpsProxyUrl}:${httpsPort}`
      )
    })

    test('Should set the correct port for HTTPS', () => {
      expect(result).toHaveProperty('port', httpsPort)
    })

    test('Should return expected HTTPS Proxy object', () => {
      expect(result).toHaveProperty('url')
      expect(result).toHaveProperty('proxyAgent')
      expect(result).toHaveProperty('httpAndHttpsProxyAgent')
    })
  })
})
