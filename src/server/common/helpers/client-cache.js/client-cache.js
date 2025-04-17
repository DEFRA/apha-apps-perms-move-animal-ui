export const disableClientCache = (request, h) => {
  return (
    request.response
      .header?.('Cache-Control', 'no-store, must-revalidate, max-age=0')
      .header?.('Pragma', 'no-cache') ?? h.continue
  )
}
