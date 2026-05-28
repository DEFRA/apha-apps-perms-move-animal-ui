import { randomUUID } from 'crypto'

export const addUUIDToRequest = (request, h) => {
  request.app.uuid ??= randomUUID()
  return h.continue
}
