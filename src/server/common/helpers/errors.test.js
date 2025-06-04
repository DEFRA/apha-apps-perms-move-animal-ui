import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { catchAll, features } from '~/src/server/common/helpers/errors.js'

describe('#errors', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('should provide expected Not Found page', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/non-existent-path'
    })

    expect(result).toEqual(
      expect.stringContaining(
        'Get permission to move animals under disease controls'
      )
    )
    expect(statusCode).toBe(statusCodes.notFound)
  })
})

describe('#catchAll', () => {
  const mockErrorLogger = jest.fn()
  const mockWarnLogger = jest.fn()
  const mockStack = 'Mock error stack'
  const errorPage = 'error/index'
  const mockRequest = (/** @type {number} */ statusCode) => ({
    response: {
      isBoom: true,
      stack: mockStack,
      output: {
        statusCode
      }
    },
    logger: { error: mockErrorLogger, warn: mockWarnLogger }
  })
  const mockToolkitView = jest.fn()
  const mockToolkitCode = jest.fn()
  const mockToolkit = {
    view: mockToolkitView.mockReturnThis(),
    code: mockToolkitCode.mockReturnThis(),
    header: jest.fn()
  }

  it('should provide expected "Not Found" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.notFound), mockToolkit)

    expect(mockToolkitView).toHaveBeenCalledWith(errorPage, {
      pageTitle: 'Page not found',
      heading: statusCodes.notFound,
      message: 'Page not found'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.notFound)
  })

  it('should provide expected "Forbidden" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.forbidden), mockToolkit)

    expect(mockToolkitView).toHaveBeenCalledWith(errorPage, {
      pageTitle: 'Forbidden',
      heading: statusCodes.forbidden,
      message: 'Forbidden'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.forbidden)
  })

  it('should provide expected "Unauthorized" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.unauthorized), mockToolkit)

    expect(mockToolkitView).toHaveBeenCalledWith(errorPage, {
      pageTitle: 'Unauthorized',
      heading: statusCodes.unauthorized,
      message: 'Unauthorized'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.unauthorized)
  })

  it('should provide expected "Bad Request" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.badRequest), mockToolkit)

    expect(mockToolkitView).toHaveBeenCalledWith(errorPage, {
      pageTitle: 'Bad Request',
      heading: statusCodes.badRequest,
      message: 'Bad Request'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.badRequest)
  })

  const statusesWithoutDedicatedMessage = [
    statusCodes.imATeapot,
    statusCodes.serverError,
    statusCodes.badGateway
  ].map((status) => [status])

  it.each(statusesWithoutDedicatedMessage)(
    'should provide expected default page',
    (status) => {
      // @ts-expect-error - Testing purposes only
      catchAll(mockRequest(status), mockToolkit)

      expect(mockToolkitView).toHaveBeenCalledWith(errorPage, {
        pageTitle: 'Something went wrong',
        heading: status,
        message: 'Something went wrong'
      })
      expect(mockToolkitCode).toHaveBeenCalledWith(status)
    }
  )

  const statuses4xx = [
    statusCodes.notFound,
    statusCodes.forbidden,
    statusCodes.unauthorized,
    statusCodes.imATeapot
  ].map((status) => [status])

  it.each(statuses4xx)('should call warn logger on 4xx', (status) => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(status), mockToolkit)

    expect(mockWarnLogger).toHaveBeenCalledWith(mockStack)
    expect(mockErrorLogger).not.toHaveBeenCalled()
  })

  const statuses5xx = [statusCodes.serverError, statusCodes.badGateway].map(
    (status) => [status]
  )

  it.each(statuses5xx)('should call error logger on 5xx', (status) => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(status), mockToolkit)

    expect(mockWarnLogger).not.toHaveBeenCalled()
    expect(mockErrorLogger).toHaveBeenCalledWith(mockStack)
  })

  it.each(features)(
    'should set Permissions-Policy header to disallow %s',
    (feature) => {
      const mockToolkitHeader = jest.fn().mockReturnThis()
      const mockToolkit = {
        view: mockToolkitView.mockReturnThis(),
        code: mockToolkitCode.mockReturnThis(),
        header: mockToolkitHeader
      }

      // @ts-expect-error - Testing purposes only
      catchAll(mockRequest(statusCodes.notFound), mockToolkit)

      // Find the Permissions-Policy header argument
      const headerCall = mockToolkitHeader.mock.calls.find(
        ([name]) => name === 'Permissions-Policy'
      )
      expect(headerCall).toBeDefined()
      const headerValue = headerCall[1]

      expect(headerValue).toContain(`${feature}=()`)
    }
  )
})

/**
 * @import { Server } from '@hapi/hapi'
 */
