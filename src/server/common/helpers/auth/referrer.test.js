import { retrieveReferrer, storeReferrer } from './referrer.js'

const referrerKey = 'referrer'

describe('retrieveReferrer', () => {
  const requestWithFlash = (value) => {
    const request = {
      yar: {
        flash: jest.fn()
      }
    }
    request.yar.flash.mockReturnValueOnce(value)
    return request
  }

  it('should return a single item if one exists', () => {
    const lastVisited = '/my-page'
    const request = requestWithFlash(lastVisited)
    expect(retrieveReferrer(request)).toBe(lastVisited)
    expect(request.yar.flash).toHaveBeenCalledWith(referrerKey)
  })

  it('should return a default of /task-list if no single value exists', () => {
    expect(retrieveReferrer(requestWithFlash([]))).toBe('/task-list')
    expect(retrieveReferrer(requestWithFlash(undefined))).toBe('/task-list')
  })
})

describe('storeReferrer', () => {
  it('should flash referrer using override', () => {
    const request = {
      yar: {
        flash: jest.fn()
      }
    }

    storeReferrer(request, '/my-page')

    expect(request.yar.flash).toHaveBeenCalledWith(referrerKey, '/my-page', {
      isOverride: true
    })
  })
})
