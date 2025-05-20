const key = 'referrer'

export const storeReferrer = (request, value) => {
  request.yar.flash(key, value, { isOverride: true })
}
export const retrieveReferrer = (request) => {
  const value = request.yar.flash(key)

  if (typeof value === 'string') {
    return value
  }
  return '/task-list'
}
