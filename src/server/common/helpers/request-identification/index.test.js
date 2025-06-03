import { addUUIDToRequest } from './index.js'
import { randomUUID } from 'crypto'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mock-uuid')
}))

describe('addUUIDToRequest', () => {
  let request
  let h

  beforeEach(() => {
    request = { app: {} }
    h = { continue: 'mock-continue' }
  })

  it('should add a uuid to request.app if not present', () => {
    addUUIDToRequest(request, h)
    expect(request.app.uuid).toBe('mock-uuid')
    expect(randomUUID).toHaveBeenCalled()
  })

  it('should not overwrite existing uuid', () => {
    request.app.uuid = 'existing-uuid'
    addUUIDToRequest(request, h)
    expect(request.app.uuid).toBe('existing-uuid')
    expect(randomUUID).not.toHaveBeenCalled()
  })

  it('should return h.continue', () => {
    const result = addUUIDToRequest(request, h)
    expect(result).toBe(h.continue)
  })
})
