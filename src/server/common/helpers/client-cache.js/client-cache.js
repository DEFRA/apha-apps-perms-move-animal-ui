export const disableClientCache = (request, h) => {
  if (typeof request.response?.header !== 'function') {
    return h.continue
  }

  request.response
    .header('Cache-Control', 'no-store, must-revalidate, max-age=0')
    .header('Pragma', 'no-cache')

  return h.continue
}
