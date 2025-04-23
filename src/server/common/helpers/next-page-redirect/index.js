export const nextPageRedirect = (nextPage, query) => {
  const queryParams = new URLSearchParams(query)
  let url = nextPage.urlPath

  if (queryParams.size > 0) {
    url += `?${queryParams.toString()}`
  }

  return url
}
