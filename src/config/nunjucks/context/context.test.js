import { spyOnConfig } from '~/src/server/common/test-helpers/config.js'

const mockReadFileSync = jest.fn()
const mockLoggerError = jest.fn()

jest.mock('node:fs', () => ({
  ...jest.requireActual('node:fs'),
  readFileSync: () => mockReadFileSync()
}))
jest.mock('~/src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({ error: (...args) => mockLoggerError(...args) })
}))

describe('#context', () => {
  const mockRequest = { path: '/', app: { uuid: 'unique-identifier' } }
  const manageAccountUrl =
    'https://your-account.cpdev.cui.defra.gov.uk/management'
  let contextResult

  describe('When webpack manifest file read succeeds', () => {
    let contextImport

    beforeAll(async () => {
      spyOnConfig('auth', { manageAccountUrl })
      contextImport = await import('~/src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      // Return JSON string

      mockReadFileSync.mockReturnValue(`{
        "application.js": "javascripts/application.js",
        "stylesheets/application.scss": "stylesheets/application.css"
      }`)

      contextResult = contextImport.context(mockRequest)
    })

    it('Should provide expected context', () => {
      expect(contextResult).toEqual({
        assetPath: '/public/assets',
        breadcrumbs: [],
        features: {
          authEnabled: false,
          authRequired: true,
          emailConfirmation: true,
          exoticsJourney: true,
          pdfUpload: true,
          prototypeMode: false
        },
        uuid: 'unique-identifier',
        displayName: undefined,
        getAssetPath: expect.any(Function),
        isAuthenticated: false,
        manageAccountUrl,
        navigation: [
          {
            isActive: true,
            text: 'Home',
            url: '/'
          },
          {
            isActive: false,
            text: 'About',
            url: '/about'
          }
        ],
        serviceName: 'Get permission to move animals under disease controls',
        serviceUrl: '/'
      })
    })

    describe('With valid asset path', () => {
      it('Should provide expected asset path', () => {
        expect(contextResult.getAssetPath('application.js')).toBe(
          '/public/javascripts/application.js'
        )
      })
    })

    describe('With invalid asset path', () => {
      it('Should provide expected asset', () => {
        expect(contextResult.getAssetPath('an-image.png')).toBe(
          '/public/an-image.png'
        )
      })
    })
  })

  describe('When webpack manifest file read fails', () => {
    let contextImport

    beforeAll(async () => {
      contextImport = await import('~/src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      mockReadFileSync.mockReturnValue(new Error('File not found'))

      contextResult = contextImport.context(mockRequest)
    })

    it('Should log that the Webpack Manifest file is not available', () => {
      expect(mockLoggerError).toHaveBeenCalledWith(
        'Webpack assets-manifest.json not found'
      )
    })
  })
})

describe('#context cache', () => {
  const mockRequest = { path: '/', app: { uuid: 'unique-identifier' } }
  const manageAccountUrl =
    'https://your-account.cpdev.cui.defra.gov.uk/management'
  let contextResult

  describe('Webpack manifest file cache', () => {
    let contextImport

    beforeAll(async () => {
      spyOnConfig('auth', { manageAccountUrl })
      contextImport = await import('~/src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      // Mock values before context is called
      mockReadFileSync.mockReturnValue(`{
      "application.js": "javascripts/application.js",
      "stylesheets/application.scss": "stylesheets/application.css"
    }`)

      contextResult = contextImport.context(mockRequest)
    })

    afterEach(jest.restoreAllMocks)

    it('Should read file', () => {
      expect(mockReadFileSync).toHaveBeenCalled()
    })

    it('Should use cache', () => {
      expect(mockReadFileSync).not.toHaveBeenCalled()
    })

    it('Should provide expected context', () => {
      expect(contextResult).toEqual({
        assetPath: '/public/assets',
        breadcrumbs: [],
        features: {
          authEnabled: false,
          authRequired: true,
          emailConfirmation: true,
          exoticsJourney: true,
          pdfUpload: true,
          prototypeMode: false
        },
        uuid: 'unique-identifier',
        getAssetPath: expect.any(Function),
        isAuthenticated: false,
        manageAccountUrl,
        displayName: undefined,
        navigation: [
          {
            isActive: true,
            text: 'Home',
            url: '/'
          },
          {
            isActive: false,
            text: 'About',
            url: '/about'
          }
        ],
        serviceName: 'Get permission to move animals under disease controls',
        serviceUrl: '/'
      })
    })
  })
})
