export const disableClientCache = (request, h) => {
  if (typeof request.response?.header === 'function') {
    request.response.header(
      'Cache-Control',
      'no-store, must-revalidate, max-age=0'
    )
    request.response.header('Pragma', 'no-cache')
    return request.response
  }

  return h.continue
}
