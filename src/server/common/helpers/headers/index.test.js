import { features, allRequests } from './index.js'

const mockToolkitView = jest.fn()
const mockToolkitCode = jest.fn()
const mockHeader = jest.fn()
const mockRequest = (/** @type {number} */ statusCode) => ({
  response: {
    header: mockHeader,
    output: {
      statusCode
    }
  }
})

describe('#Headers', () => {
  it('should have a Cross-Origin-Embedder-Policy header set to require-corp', () => {
    const mockToolkit = {
      view: mockToolkitView.mockReturnThis(),
      code: mockToolkitCode.mockReturnThis()
    }

    // @ts-expect-error - Testing purposes only
    allRequests(mockRequest(200), mockToolkit)

    expect(mockHeader).toHaveBeenCalledWith(
      'Cross-Origin-Embedder-Policy',
      'require-corp'
    )
  })

  it.each(features)(
    'should set Permissions-Policy header to disallow %s',
    (feature) => {
      const headerValue = `${feature}=()`

      const mockToolkit = {
        view: mockToolkitView.mockReturnThis(),
        code: mockToolkitCode.mockReturnThis()
      }

      // @ts-expect-error - Testing purposes only
      allRequests(mockRequest(200), mockToolkit)

      // Find the Permissions-Policy header argument
      const headerCall = mockHeader.mock.calls.find(
        ([name]) => name === 'Permissions-Policy'
      )
      expect(headerCall).toBeDefined()

      expect(headerValue).toContain(`${feature}=()`)
    }
  )
})
