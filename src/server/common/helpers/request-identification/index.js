import { randomUUID } from 'crypto'

export const addUUIDToRequest = (request, h) => {
  if (!request.app.uuid) {
    request.app.uuid = randomUUID()
  }
  return h.continue
}
